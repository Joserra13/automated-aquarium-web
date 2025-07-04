const { Pool } = require("pg");
const { Resend } = require("resend");

async function main() {
  let pool; // Declare pool variable outside try block

  try {
    // Read inputs from environment variables
    const blogMetadataStr = process.env.INPUT_BLOG_METADATA;
    const databaseUrl = process.env.DATABASE_URL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const siteUrl =
      process.env.INPUT_SITE_URL || "https://automated-aquarium.com";
    const batchSize = parseInt(process.env.INPUT_BATCH_SIZE || "50", 10);
    const fromEmail =
      process.env.INPUT_FROM_EMAIL || 'newsletter-no-reply@automated-aquarium.com';

    if (!blogMetadataStr) {
      throw new Error("Missing required input: blog_metadata");
    }

    // Parse blog metadata
    let blogMetadata = [];
    try {
      blogMetadata = JSON.parse(blogMetadataStr);
    } catch (error) {
      throw new Error(`Failed to parse blog metadata: ${error.message}`);
    }

    if (!Array.isArray(blogMetadata) || blogMetadata.length === 0) {
      console.log("No blog posts to process. Exiting.");
      return;
    }

    console.log(`Processing ${blogMetadata.length} blog post(s)`);

    // Initialize PostgreSQL connection
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : false,
    });

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Get all confirmed subscribers
    const result = await pool.query(
      "SELECT id, email FROM newsletter"
    );
    const subscribers = result.rows;
    console.log(`Found ${subscribers.length} confirmed subscribers`);

    let successCount = 0;
    let errorCount = 0;

    // Process each blog post
    for (const post of blogMetadata) {
      console.log(`Processing notifications for post: ${post.title}`);

      // Validate required post fields
      if (!post.slug || !post.title) {
        console.warn("Skipping post with missing slug or title");
        continue;
      }

      // Send emails in batches
      for (let i = 0; i < subscribers.length; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize);
        console.log(
          `Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} subscribers)`
        );

        const results = await Promise.allSettled(
          batch.map((subscriber) =>
            sendEmailAndLog(resend, pool, subscriber, post, fromEmail, siteUrl)
          )
        );

        results.forEach((result) => {
          result.status === "fulfilled" ? successCount++ : errorCount++;
        });

        // Add delay between batches if remaining
        if (i + batchSize < subscribers.length) {
          console.log("Waiting 5 second between batches...");
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    }

    console.log(
      `Notification process complete. Success: ${successCount}, Errors: ${errorCount}`
    );

    // Exit with error if significant failures
    if (errorCount > 0) {
      process.exitCode = 1;
      if (errorCount > successCount) {
        throw new Error(`High failure rate: ${errorCount} failures`);
      }
    }
  } catch (error) {
    console.error("❌ Action failed:", error.message);
    process.exitCode = 1;
  } finally {
    // Clean up database connection if exists
    if (pool) {
      try {
        await pool.end();
      } catch (error) {
        console.error("Error closing pool:", error);
      }
    }
  }
}

async function sendEmailAndLog(
  resend,
  pool,
  subscriber,
  post,
  fromEmail,
  siteUrl
) {
  try {
    // Send email
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: subscriber.email,
      subject: `New Blog Post: ${post.title}`,
      html: createEmailTemplate(post, subscriber, siteUrl),
    });

    if (error) throw new Error(error.message);

    // Log success
    await pool.query(
      "INSERT INTO email_logs (post_slug, subscriber_id, status) VALUES ($1, $2, $3)",
      [post.slug, subscriber.id, "SUCCESS"]
    );
  } catch (error) {
    // Log error
    await pool.query(
      "INSERT INTO email_logs (post_slug, subscriber_id, status, error_message) VALUES ($1, $2, $3, $4)",
      [post.slug, subscriber.id, "ERROR", error.message]
    );
    throw error;
  }
}

function createEmailTemplate(post, subscriber, siteUrl) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">There is a new post at the Automated Aquarium blog</h1>
      <h3 style="color: #333;">${post.title}</h1>
      ${post.summary ? `<p style="color: #666;">${post.summary}</p>` : ""}
      <a href="${siteUrl}/blog/${post.slug}"
        style="display: inline-block; padding: 10px 20px;
              background-color: #007bff; color: white;
              text-decoration: none; border-radius: 5px;
              margin: 15px 0;">
        Read Full Post
      </a>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">
          You received this email because you subscribed to updates from the automated aquarium blog.<br>
          <a href="${siteUrl}/api/unsubscribe?email=${encodeURIComponent(subscriber.email)}"
            style="color: #007bff; text-decoration: none;">
            Unsubscribe
          </a>
        </p>
      </div>
    </div>
  `;
}

// Run the main function
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});

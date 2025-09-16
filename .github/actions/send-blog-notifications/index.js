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
    const fromEmail =
      process.env.INPUT_FROM_EMAIL ||
      "newsletter@automated-aquarium.com";

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
    const result = await pool.query("SELECT id, email FROM newsletter");
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

      // Send emails one after another (no batching)
      for (const subscriber of subscribers) {
        try {
          // Respect the 2 requests per second limit by waiting 500ms between emails
          await new Promise((resolve) => setTimeout(resolve, 3000));
          await sendEmailAndLog(
            resend,
            pool,
            subscriber,
            post,
            fromEmail,
            siteUrl
          );
          successCount++;
        } catch (error) {
          console.error(
            `Failed to send to ${subscriber.email}:`,
            error.message
          );
          errorCount++;
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
      subject: `New Automated Aquarium Blog Post: ${post.title}`,
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
    <div style="background: #f6f8fa; padding: 40px 0;">
      <div style="background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); max-width: 520px; margin: 0 auto; padding: 32px 28px; font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="${siteUrl}/favicon.ico" alt="Automated Aquarium Logo" style="width: 64px; margin-bottom: 18px;" />
          <h1 style="color: #222; font-size: 1.7em; margin-bottom: 8px;">Automated Aquarium: New Blog Post Alert!</h1>
          <h2 style="color: #007bff; font-size: 1.2em; margin-bottom: 18px;">${post.title}</h2>
        </div>
        ${post.summary ? `<p style="color: #444; font-size: 1em; line-height: 1.6; margin-bottom: 24px;">${post.summary}</p>` : ""}
        <div style="text-align: center; margin-bottom: 28px;">
          <a href="${siteUrl}/blog/${post.slug}"
            style="display: inline-block; padding: 12px 32px; background: linear-gradient(90deg,#007bff 0%,#00c6ff 100%); color: #fff; font-weight: 600; border-radius: 6px; text-decoration: none; font-size: 1em; box-shadow: 0 2px 8px rgba(0,123,255,0.08); transition: background 0.2s;">
            Read Full Post
          </a>
        </div>
        ${post.imageUrl ? `
          <div style="text-align: center; margin-bottom: 22px;">
            <img src="${post.imageUrl}" alt="Blog Post Image" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" />
          </div>
        ` : ""}
      </div>
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

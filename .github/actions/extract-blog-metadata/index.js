const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

async function run() {
  try {
    // Get inputs
    const blogDirectory = core.getInput('blog_directory');
    
    // Get changed files between current and previous commit
    let stdout = '';
    let stderr = '';
    
    const options = {
      listeners: {
        stdout: (data) => {
          stdout += data.toString();
        },
        stderr: (data) => {
          stderr += data.toString();
        }
      }
    };
    
    // Get the git diff to find changed files

    await exec.exec('git', ['diff', '--name-only', 'HEAD~4', 'HEAD'], options);
    
    // Filter for blog files
    const changedFiles = stdout
      .split('\n')
      .filter(file => 
        file.startsWith(blogDirectory) && 
        (file.endsWith('.md') || file.endsWith('.mdx'))
      )
      .filter(Boolean);
    
    core.info(`Found ${changedFiles.length} changed blog files`);
    
    if (changedFiles.length === 0) {
      core.setOutput('metadata', '[]');
      return;
    }
    
    // Process each file to extract metadata
    const metadata = [];
    
    for (const file of changedFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const { data } = matter(content);

        console.log('data', data);
        
        // Validate required frontmatter
        if (!data.title || !data.date) {
          core.warning(`Missing required metadata (title or date) in ${file}`);
          continue;
        }
        
        const fileName = path.basename(file, path.extname(file));
        metadata.push({
          filePath: file,
          title: data.title,
          slug: fileName,
          date: data.date || new Date().toISOString(),
        });
        
        core.info(`Processed: ${data.title}`);
      } catch (error) {
        core.warning(`Error processing ${file}: ${error.message}`);
      }
    }
    
    // Output the metadata as JSON
    core.setOutput('metadata', JSON.stringify(metadata));
    core.info(`Successfully extracted metadata for ${metadata.length} blog posts`);
    
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
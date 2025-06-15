# Extract Blog Metadata Action

A GitHub Action that extracts metadata from new or modified blog posts in Markdown or MDX format.

## What it does

This action:

- Detects which blog posts have been added or modified in the current commit
- Extracts key metadata from the frontmatter of those posts
- Outputs a structured JSON object with the post metadata

## Inputs

| Input          | Description              | Required | Default      |
|----------------|--------------------------|----------|--------------|
| blog_directory | Path to blog posts       | No       | content/blog |

## Outputs

| Output   | Description                                       |
|----------|---------------------------------------------------|
| metadata | JSON array of extracted metadata from blog posts  |

## Example Usage

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 2  # Important: Need at least 2 commits to detect changes

      - name: Extract blog metadata
        id: extract
        uses: ./.github/actions/extract-blog-metadata
        with:
          blog_directory: 'content/blog'
          
      - name: Use the metadata
        run: |
          echo "Found posts: ${{ steps.extract.outputs.metadata }}"

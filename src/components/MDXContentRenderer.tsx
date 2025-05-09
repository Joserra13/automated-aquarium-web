"use client";

import { MDXLayoutRenderer } from 'pliny/mdx-components.js';
import { components } from "@/components/MDXComponents";

export default function MDXContentRenderer({ code, toc }: { code: string; toc: any }) {
  return <MDXLayoutRenderer code={code} components={components} toc={toc || []} />;
}

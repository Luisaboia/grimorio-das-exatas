"use client";

import "katex/dist/katex.min.css";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import type { ComponentPropsWithoutRef } from "react";

import { Example } from "./Example";
import { Formula } from "./Formula";
import { FormulaBlock } from "./FormulaBlock";
import { Note } from "./Note";
import { Variable } from "./Variable";

const mdxComponents = {
  // Custom formula components
  Formula,
  FormulaBlock,
  Variable,
  Example,
  Note,

  // Styled HTML elements
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mb-4 mt-8 text-3xl font-bold text-surface-900 first:mt-0 dark:text-surface-50"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mb-3 mt-6 text-2xl font-semibold text-surface-800 dark:text-surface-100"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mb-2 mt-5 text-xl font-semibold text-surface-800 dark:text-surface-100"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="my-3 leading-relaxed text-surface-800 dark:text-surface-200"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-3 list-disc space-y-1 pl-6 text-surface-800 dark:text-surface-200"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-3 list-decimal space-y-1 pl-6 text-surface-800 dark:text-surface-200"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong
      className="font-semibold text-surface-900 dark:text-surface-50"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-sm dark:bg-surface-800"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-4 border-l-4 border-primary-300 pl-4 italic text-surface-800 dark:border-primary-700 dark:text-surface-200"
      {...props}
    />
  ),
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}

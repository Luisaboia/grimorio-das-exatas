"use client";

import "katex/dist/katex.min.css";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Example } from "./Example";
import { Formula } from "./Formula";
import { FormulaBlock } from "./FormulaBlock";
import { Note } from "./Note";
import { Variable } from "./Variable";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    return getTextContent((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
      className="mb-4 mt-8 text-3xl font-bold text-surface-900 first:mt-0 text-surface-50"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    const id = slugify(getTextContent(props.children));
    return (
      <h2
        id={id}
        className="mb-3 mt-6 scroll-mt-24 text-2xl font-semibold text-surface-800 text-surface-100"
        {...props}
      />
    );
  },
  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    const id = slugify(getTextContent(props.children));
    return (
      <h3
        id={id}
        className="mb-2 mt-5 scroll-mt-24 text-xl font-semibold text-surface-800 text-surface-100"
        {...props}
      />
    );
  },
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="my-3 leading-relaxed text-surface-800 text-surface-200"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-3 list-disc space-y-1 pl-6 text-surface-800 text-surface-200"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-3 list-decimal space-y-1 pl-6 text-surface-800 text-surface-200"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong
      className="font-semibold text-surface-900 text-surface-50"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-sm bg-surface-800"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-4 border-l-4 border-primary-300 pl-4 italic text-surface-800 border-primary-700 text-surface-200"
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

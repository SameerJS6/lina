"use server";

import "server-only";

import fs from "fs/promises";
import path from "path";
import type { JSX } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { codeToHast, type BundledLanguage } from "shiki/bundle/web";

async function highlight(code: string, lang: BundledLanguage) {
  const hast = await codeToHast(code, {
    lang,
    defaultColor: false,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    transformers: [
      {
        pre(node) {
          node.properties["class"] =
            "min-w-0 px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent";
        },
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
        line(node) {
          node.properties["data-line"] = "";
        },
      },
    ],
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}

// Simple in-memory cache for component code
const codeCache = new Map<string, { code: string; highlightedCode: JSX.Element } | null>();

async function getComponentCode(
  name: string,
  lang: BundledLanguage,
  customFilePath?: string
): Promise<{ code: string; highlightedCode: JSX.Element } | null> {
  const cacheKey = `${name}-${lang}-${customFilePath || ""}`;

  // Check cache first
  if (codeCache.has(cacheKey)) {
    return codeCache.get(cacheKey)!;
  }

  try {
    let rawContent = "";

    if (customFilePath) {
      const filePath = path.join(process.cwd(), customFilePath);
      rawContent = await fs.readFile(filePath, "utf-8");
    } else {
      const publicPath = path.join("public", "r", `${name}.json`);
      const filePath = path.join(process.cwd(), publicPath);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      rawContent = data.files[0].content || "";
    }

    if (!rawContent.trim()) {
      codeCache.set(cacheKey, null);
      return null;
    }

    const highlightedCode = await highlight(rawContent, lang);
    const result = { code: rawContent, highlightedCode };

    // Cache the result
    codeCache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error("Error getting component code", error);
    codeCache.set(cacheKey, null);
    return null;
  }
}

export { highlight, getComponentCode };

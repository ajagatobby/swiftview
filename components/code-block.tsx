"use client";
import React, { useEffect, useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-swift";

interface CodeBlocksProps {
  content: string;
}

const CodeBlocks = ({ content }: CodeBlocksProps) => {
  const codeBlocks = useMemo(
    () => content.match(/```[\s\S]*?```/g) || [],
    [content]
  );

  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    Prism.highlightAll();
  }, [codeBlocks]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (codeBlocks.length === 0) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-600 font-medium">
              code.swift
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => copyToClipboard(content, 0)}
              className="flex items-center gap-2 px-3 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
              title="Copy code"
            >
              {copiedStates[0] ? (
                <>
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              swift
            </span>
          </div>
        </div>
        <div className="relative bg-white rounded-b-lg">
          <div className="flex">
            <div className="flex-shrink-0 w-12 pr-4 text-right text-xs text-gray-400 select-none border-r border-gray-200 bg-gray-50">
              {content.split("\n").map((_, lineIndex) => (
                <div key={lineIndex} className="leading-relaxed py-0.5">
                  {lineIndex + 1}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <pre className="p-4 overflow-x-auto bg-white">
                <code className="language-swift !text-sm text-gray-800 leading-relaxed">
                  {content}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {codeBlocks.map((block, index) => {
        const languageMatch = block.match(/```(\w+)/);
        const language = languageMatch ? languageMatch[1] : "text";
        const codeContent = block
          .replace(/```\w*\n?/, "")
          .replace(/```$/, "")
          .trim();

        // Extract filename from code content if it exists
        const filenameMatch = codeContent.match(/\/\/\s*(.+\.swift)/);
        const filename = filenameMatch
          ? filenameMatch[1]
          : language === "swift"
          ? "main.swift"
          : `file.${language}`;

        return (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {filename}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => copyToClipboard(codeContent, index)}
                  className="flex items-center gap-2 px-3 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  title="Copy code"
                >
                  {copiedStates[index] ? (
                    <>
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  {language}
                </span>
              </div>
            </div>
            <div className="relative bg-white rounded-b-lg">
              <div className="flex">
                <div className="flex-shrink-0 w-12 pr-4 text-right text-xs text-gray-400 select-none border-r border-gray-200 bg-gray-50">
                  {codeContent.split("\n").map((_, lineIndex) => (
                    <div key={lineIndex} className="leading-relaxed py-0.5">
                      {lineIndex + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <pre
                    className="p-4 overflow-x-auto bg-white"
                    style={{ backgroundColor: "white" }}
                  >
                    <code
                      className={`language-${language} !text-sm text-gray-800 leading-relaxed`}
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
                        backgroundColor: "white",
                      }}
                    >
                      {codeContent}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CodeBlocks;

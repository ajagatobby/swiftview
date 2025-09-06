"use client";
import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-swift";
import "prismjs/themes/prism.css";

interface CodeBlocksProps {
  content: string;
}

const CodeBlocks = ({ content }: CodeBlocksProps) => {
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];

  useEffect(() => {
    Prism.highlightAll();
  }, [codeBlocks]);

  return (
    <div className="space-y-6">
      {codeBlocks.map((block, index) => {
        const languageMatch = block.match(/```(\w+)/);
        const language = languageMatch ? languageMatch[1] : "text";
        const codeContent = block
          .replace(/```\w*\n?/, "")
          .replace(/```$/, "")
          .trim();

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
                  {language === "swift" ? "main.swift" : `file.${language}`}
                </span>
              </div>
              <div className="flex items-center gap-3">
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

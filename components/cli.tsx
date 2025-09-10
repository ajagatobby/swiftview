"use client";
import React, { useState } from "react";

interface CLITab {
  id: string;
  label: string;
  command: string;
}

interface CLIProps {
  tabs?: CLITab[];
  defaultTab?: string;
  className?: string;
}

const CLI: React.FC<CLIProps> = ({
  tabs = [
    { id: "pnpm", label: "pnpm", command: "pnpm dlx shadcn@latest init" },
    { id: "npm", label: "npm", command: "npx shadcn@latest init" },
    { id: "yarn", label: "yarn", command: "yarn dlx shadcn@latest init" },
    { id: "bun", label: "bun", command: "bunx shadcn@latest init" },
  ],
  defaultTab = "pnpm",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [copied, setCopied] = useState(false);

  const activeCommand = tabs.find((tab) => tab.id === activeTab)?.command || "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(activeCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy command:", err);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        {/* Terminal Icon and Tabs */}
        <div className="flex items-center space-x-4">
          {/* Terminal Icon */}
          <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-mono">{"<_"}</span>
          </div>

          {/* Package Manager Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
          title="Copy command"
        >
          {copied ? (
            <svg
              className="w-4 h-4 text-green-600"
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
          ) : (
            <svg
              className="w-4 h-4"
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
          )}
        </button>
      </div>

      {/* Command Content */}
      <div className="px-4 py-3 bg-white">
        <code className="text-sm text-gray-900 font-mono">{activeCommand}</code>
      </div>
    </div>
  );
};

export default CLI;

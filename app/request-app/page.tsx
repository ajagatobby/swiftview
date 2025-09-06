"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui";

const RequestApp = () => {
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(appName, appDescription, email);
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pb-20 pt-4">
      <div className="w-full flex flex-col items-center justify-start my-4 gap-2 relative z-10">
        <h1 className="lg:text-3xl text-2xl font-bold tracking-tighter text-gray-900/90 text-center">
          Request an app for free
        </h1>
        <p className="lg:text-base text-sm text-center text-gray-500 max-w-md">
          We are always looking for new ideas and feedback. If you have an idea
          for an app, please let us know.
        </p>
      </div>
      <div className="w-full max-w-md mt-12 relative z-10">
        <form
          className="flex flex-col items-center justify-start gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="App name"
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-900 h-12 transition-all duration-200 placeholder:text-gray-900/50 text-sm"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-900 h-12 transition-all duration-200 placeholder:text-gray-900/50 text-sm"
          />
          <textarea
            value={appDescription}
            onChange={(e) => setAppDescription(e.target.value)}
            placeholder="App description"
            rows={4}
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 placeholder:text-gray-900/50 text-sm resize-none"
          />

          <Button
            className="w-full text-center justify-center mt-4"
            disabled={!appName || !appDescription || !email}
            loading={loading}
          >
            Request App
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RequestApp;

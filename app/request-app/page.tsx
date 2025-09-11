"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui";
import { createRequestedApp } from "~/lib/actions";

const RequestApp = () => {
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await createRequestedApp({
        appName,
        description: appDescription,
        email,
      });

      setSuccess(true);
      setAppName("");
      setAppDescription("");
      setEmail("");
    } catch (err) {
      setError("Failed to submit your request. Please try again.");
      console.error("Error submitting app request:", err);
    } finally {
      setLoading(false);
    }
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
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm text-center">
              Thank you! Your app request has been submitted successfully.
              We&apos;ll review it and get back to you soon.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm text-center">{error}</p>
          </div>
        )}

        <form
          className="flex flex-col items-center justify-start gap-2 relative"
          onSubmit={handleSubmit}
        >
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="text-sm text-gray-600">
                  Submitting your request...
                </p>
              </div>
            </div>
          )}
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="App name"
            disabled={loading}
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-900 h-12 transition-all duration-200 placeholder:text-gray-900/50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            disabled={loading}
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-900 h-12 transition-all duration-200 placeholder:text-gray-900/50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <textarea
            value={appDescription}
            onChange={(e) => setAppDescription(e.target.value)}
            placeholder="App description"
            rows={4}
            disabled={loading}
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 placeholder:text-gray-900/50 text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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

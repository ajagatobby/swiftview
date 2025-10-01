"use client";

import { SignIn } from "@clerk/nextjs";
import { Suspense, useState, useEffect } from "react";
import { LoadingSpinner } from "~/components/ui/spinner";

function SignInComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "mx-auto",
          card: "shadow-lg",
        },
      }}
    />
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your SwiftView account
          </p>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <SignInComponent />
        </Suspense>
      </div>
    </div>
  );
}

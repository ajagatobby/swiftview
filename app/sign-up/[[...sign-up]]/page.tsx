"use client";

import { SignUp } from "@clerk/nextjs";
import { Suspense, useState, useEffect } from "react";
import { LoadingSpinner } from "~/components/ui/spinner";

function SignUpComponent() {
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
    <SignUp
      appearance={{
        elements: {
          rootBox: "mx-auto",
          card: "shadow-lg",
        },
      }}
    />
  );
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join SwiftView and access premium SwiftUI screens
          </p>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <SignUpComponent />
        </Suspense>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Feature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  isRecommended?: boolean;
  buttonText: string;
  buttonDisabled?: boolean;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Perfect for exploring",
    buttonText: "Current plan",
    buttonDisabled: true,
    features: [
      { text: "Most screens & animations", included: true },
      { text: "No mini apps", included: false },
      { text: "No weekly releases", included: false },
      { text: "No custom requests", included: false },
      { text: "No priority support", included: false },
      { text: "No source code", included: false },
      { text: "No commercial license", included: false },
      { text: "No lifetime updates", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$699",
    period: "/year",
    description: "Everything you need",
    buttonText: "Upgrade to Pro",
    isRecommended: true,
    features: [
      { text: "All mini apps", included: true },
      { text: "Weekly new releases", included: true },
      { text: "Custom app requests", included: true },
      { text: "All screens & designs", included: true },
      { text: "Priority support", included: true },
      { text: "Source code included", included: true },
      { text: "Commercial license", included: true },
      { text: "Lifetime updates", included: true },
    ],
  },
];

const FeatureItem = ({
  feature,
  isPro,
}: {
  feature: Feature;
  isPro: boolean;
}) => {
  const Icon = feature.included ? CheckIcon : XIcon;
  const iconColor = feature.included
    ? isPro
      ? "text-orange-600"
      : "text-gray-400"
    : "text-gray-300";
  const textColor = feature.included ? "text-gray-700" : "text-gray-500";

  return (
    <div className="flex items-start gap-3">
      <Icon className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
      <span className={`text-sm ${textColor}`}>{feature.text}</span>
    </div>
  );
};

const PricingCard = ({
  plan,
  onUpgrade,
  isLoading,
}: {
  plan: PricingPlan;
  onUpgrade?: () => void;
  isLoading?: boolean;
}) => {
  const isPro = plan.isRecommended;
  const cardClass = isPro
    ? "relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-lg p-8 border border-amber-200"
    : "relative bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors";

  const buttonClass = isPro
    ? "w-full py-3 px-4 bg-gradient-to-b from-stone-900 to-stone-700 border border-stone-900 hover:opacity-95 disabled:opacity-50 text-white text-sm font-semibold rounded-lg tracking-tight transition-opacity cursor-pointer"
    : "w-full py-3 px-4 bg-white border border-gray-300 text-gray-500 text-sm font-medium rounded-lg tracking-tight cursor-not-allowed";

  return (
    <div className={cardClass}>
      {isPro && (
        <div className="absolute -top-3 left-6">
          <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white text-xs font-semibold">
            RECOMMENDED
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {plan.name}
        </h3>
        <div className="flex items-baseline mb-3">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          {plan.period && (
            <span className="text-gray-600 ml-2 text-sm">{plan.period}</span>
          )}
        </div>
        <p className="text-sm text-gray-600">{plan.description}</p>
      </div>

      <div className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} isPro={!!isPro} />
        ))}
      </div>

      <button
        disabled={plan.buttonDisabled || isLoading}
        onClick={isPro && !plan.buttonDisabled ? onUpgrade : undefined}
        className={buttonClass}
      >
        {isLoading ? "Processing..." : plan.buttonText}
      </button>
    </div>
  );
};

const SubscriptionModal = React.memo<SubscriptionModalProps>(
  ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    const handleUpgrade = useCallback(async () => {
      // Wait for Clerk to load
      if (!isLoaded) return;

      // If user is not signed in, redirect to sign-in with return URL
      if (!isSignedIn) {
        const currentPath = window.location.pathname + window.location.search;
        const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(
          currentPath
        )}`;
        router.push(signInUrl);
        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.error) {
          console.error("Checkout error:", data.error);
          return;
        }

        if (data.url) {
          window.location.href = data.url;
        }
      } catch (error) {
        console.error("Upgrade error:", error);
      } finally {
        setIsLoading(false);
      }
    }, [isSignedIn, isLoaded, router]);

    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
              onClick={onClose}
            >
              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glowing gradient at the top */}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-400/20 via-blue-500/10 to-transparent blur-3xl -z-10" />
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-400/5 via-blue-600/10 to-transparent blur-3xl -z-10" />

                {/* Header */}
                <div className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Upgrade to Pro
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Unlock all features and content
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Pricing Cards */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {PRICING_PLANS.map((plan, index) => (
                      <PricingCard
                        key={index}
                        plan={plan}
                        onUpgrade={handleUpgrade}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

SubscriptionModal.displayName = "SubscriptionModal";

export default SubscriptionModal;

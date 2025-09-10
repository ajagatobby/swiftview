import { cn } from "~/Utilities";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  onClick,
  className,
  disabled,
  loading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-gradient-to-b border border-stone-900 cursor-pointer flex items-center gap-2 from-stone-900 to-stone-700 font-medium text-sm text-white px-4 !text-center py-2 rounded-full tracking-tight hover:opacity-95 transition-opacity",
        (disabled || loading) &&
          "opacity-50 cursor-not-allowed bg-gray-300 border-gray-300 text-gray-500 hover:opacity-50",
        className
      )}
      disabled={disabled || loading}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}

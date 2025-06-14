interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-b w-full border border-stone-900 cursor-pointer flex items-center gap-2 from-stone-900 to-stone-700 font-medium text-sm text-white px-4 py-2 rounded-full tracking-tight hover:opacity-95 transition-opacity"
    >
      {children}
    </button>
  );
}

import Image from "next/image";
import ContactButton from "./contact-button";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between w-full border-b border-stone-900/5 mb-3 lg:px-2 py-2 px-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-stone-900 border border-stone-900 rounded-sm flex items-center justify-center">
          <Image src="/swift.png" alt="logo" width={24} height={24} />
        </div>
        <p className="text-base font-bold tracking-tight">SwiftView.</p>
      </div>

      <div className="flex items-center gap-2">
        <ContactButton />
      </div>
    </div>
  );
}

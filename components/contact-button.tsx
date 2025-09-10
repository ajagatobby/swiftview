"use client";

import { Button } from "./ui";

export default function ContactButton() {
  const handleClick = () => {
    window.open("mailto:ajagatobby@gmail.com", "_blank");
  };

  return (
    <Button onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z"
          stroke="currentColor"
          strokeWidth={2}
        />
      </svg>
      Work with us
    </Button>
  );
}

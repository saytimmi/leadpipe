"use client";

interface CTAButtonProps {
  text?: string;
  targetId?: string;
}

export default function CTAButton({
  text = "Разобраться",
  targetId = "form",
}: CTAButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-dark cursor-pointer"
    >
      {text}
    </button>
  );
}

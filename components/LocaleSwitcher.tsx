"use client";

export default function LocaleSwitcher() {
  const handleClick = () => {
    // Locale-less navigation
    window.location.replace("/");
  };

  return (
    <div className="flex w-full items-center justify-center flex-wrap gap-2 rounded-2xl bg-[#121212]/80 px-4 py-4 font-medium tracking-tight text-white/60 backdrop-blur-sm">
      <button
        onClick={handleClick}
        className="px-2 py-1 rounded text-xs transition-colors hover:text-white hover:bg-white/10"
      >
        EN
      </button>
    </div>
  );
}

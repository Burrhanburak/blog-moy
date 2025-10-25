interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: "tip" | "warning" | "note" | "success";
}

export function Callout({ title, children, variant = "tip" }: CalloutProps) {
  const variants = {
    tip: {
      border: "border-emerald-500/20 dark:border-emerald-500/30",
      bg: "bg-emerald-50/50 dark:bg-emerald-500/10",
      text: "text-emerald-900 dark:text-emerald-200",
      icon: "text-emerald-600 dark:text-emerald-400/80",
    },
    warning: {
      border: "border-red-500/20 dark:border-red-500/30",
      bg: "bg-red-50/50 dark:bg-red-500/10",
      text: "text-red-900 dark:text-red-200",
      icon: "text-red-600 dark:text-red-400/80",
    },
    note: {
      border: "border-blue-500/20 dark:border-blue-500/30",
      bg: "bg-blue-50/50 dark:bg-blue-500/10",
      text: "text-blue-900 dark:text-blue-200",
      icon: "text-blue-600 dark:text-blue-400/80",
    },
    success: {
      border: "border-green-500/20 dark:border-green-500/30",
      bg: "bg-green-50/50 dark:bg-green-500/10",
      text: "text-green-900 dark:text-green-200",
      icon: "text-green-600 dark:text-green-400/80",
    },
  };

  const icons = {
    tip: (
      <svg
        width="11"
        height="14"
        viewBox="0 0 11 14"
        fill="currentColor"
        className={`w-3.5 h-auto ${variants[variant].icon}`}
        aria-label="Tip"
      >
        <path d="M3.12794 12.4232C3.12794 12.5954 3.1776 12.7634 3.27244 12.907L3.74114 13.6095C3.88471 13.8248 4.21067 14 4.46964 14H6.15606C6.41415 14 6.74017 13.825 6.88373 13.6095L7.3508 12.9073C7.43114 12.7859 7.49705 12.569 7.49705 12.4232L7.50055 11.3513H3.12521L3.12794 12.4232ZM5.31288 0C2.52414 0.00875889 0.5 2.26889 0.5 4.78826C0.5 6.00188 0.949566 7.10829 1.69119 7.95492C2.14321 8.47011 2.84901 9.54727 3.11919 10.4557C3.12005 10.4625 3.12175 10.4698 3.12261 10.4771H7.50342C7.50427 10.4698 7.50598 10.463 7.50684 10.4557C7.77688 9.54727 8.48281 8.47011 8.93484 7.95492C9.67728 7.13181 10.1258 6.02703 10.1258 4.78826C10.1258 2.15486 7.9709 0.000106649 5.31288 0ZM7.94902 7.11267C7.52078 7.60079 6.99082 8.37878 6.6077 9.18794H4.02051C3.63739 8.37878 3.10743 7.60079 2.67947 7.11294C2.11997 6.47551 1.8126 5.63599 1.8126 4.78826C1.8126 3.09829 3.12794 1.31944 5.28827 1.3126C7.2435 1.3126 8.81315 2.88226 8.81315 4.78826C8.81315 5.63599 8.50688 6.47551 7.94902 7.11267ZM4.87534 2.18767C3.66939 2.18767 2.68767 3.16939 2.68767 4.37534C2.68767 4.61719 2.88336 4.81288 3.12521 4.81288C3.36705 4.81288 3.56274 4.61599 3.56274 4.37534C3.56274 3.6515 4.1515 3.06274 4.87534 3.06274C5.11719 3.06274 5.31288 2.86727 5.31288 2.62548C5.31288 2.38369 5.11599 2.18767 4.87534 2.18767Z" />
      </svg>
    ),
    warning: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="currentColor"
        className={`w-3.5 h-auto ${variants[variant].icon}`}
        aria-label="Warning"
      >
        <path d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 12.25C4.037 12.25 1.75 9.963 1.75 7S4.037 1.75 7 1.75 12.25 4.037 12.25 7 9.963 12.25 7 12.25zm0-8.75c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm0 6.5c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75z" />
      </svg>
    ),
    note: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="currentColor"
        className={`w-3.5 h-auto ${variants[variant].icon}`}
        aria-label="Note"
      >
        <path d="M3.5 0C1.57 0 0 1.57 0 3.5v7C0 12.43 1.57 14 3.5 14h7c1.93 0 3.5-1.57 3.5-3.5v-7C14 1.57 12.43 0 10.5 0h-7zM3.5 1.75h7c.966 0 1.75.784 1.75 1.75v7c0 .966-.784 1.75-1.75 1.75h-7c-.966 0-1.75-.784-1.75-1.75v-7c0-.966.784-1.75 1.75-1.75zm2.625 2.625c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75z" />
      </svg>
    ),
    success: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="currentColor"
        className={`w-3.5 h-auto ${variants[variant].icon}`}
        aria-label="Success"
      >
        <path d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm3.89 5.11l-4.5 4.5c-.14.14-.33.22-.53.22s-.39-.08-.53-.22l-2-2c-.29-.29-.29-.77 0-1.06.29-.29.77-.29 1.06 0l1.47 1.47 3.97-3.97c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06z" />
      </svg>
    ),
  };

  return (
    <div
      className={`my-4 px-5 py-4 overflow-hidden rounded-2xl flex gap-3 border ${variants[variant].border} ${variants[variant].bg}`}
      data-callout-type={variant}
    >
      <div className="mt-0.5 w-4" data-component-part="callout-icon">
        {icons[variant]}
      </div>
      <div
        className={`text-sm prose min-w-0 w-full ${variants[variant].text}`}
        data-component-part="callout-content"
      >
        {title && <strong className="block font-semibold mb-1">{title}</strong>}
        <span>{children}</span>
      </div>
    </div>
  );
}

// Keep Tip as an alias for backward compatibility
export const Tip = Callout;

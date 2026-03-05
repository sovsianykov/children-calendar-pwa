"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Calendar", icon: "📅" },
  { href: "/schedule", label: "Schedule", icon: "📚" },
] as const;

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-kid-border bg-kid-card md:bottom-auto md:top-0 md:border-t-0 md:border-b">
      <div className="mx-auto flex max-w-4xl items-center justify-around md:justify-start md:gap-2 md:px-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[48px] min-w-[48px] flex-col items-center justify-center gap-0.5 px-4 py-2 text-xs font-bold transition-colors md:flex-row md:gap-2 md:text-sm ${
                isActive
                  ? "text-kid-blue"
                  : "text-foreground/50 hover:text-foreground/80"
              }`}
            >
              <span className="text-xl md:text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      type="button"
      aria-label="Toggle dark mode"
      className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
    >
      <IconSun className="w-5 h-5 block dark:hidden" />
      <IconMoon className="w-5 h-5 hidden dark:block" />
    </button>
  );
}

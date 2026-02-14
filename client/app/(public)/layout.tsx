import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen text-zinc-900 transition-colors duration-300 dark:text-zinc-50">
      <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={"/"} title="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight">Modular Press</h1>
            <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">
              Next client
            </p>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      {children}
    </div>
  );
}

import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
    >
      {children}
    </Link>
  );
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Admin Panel
          </span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/dashboard/posts">All Posts</NavLink>
          <NavLink href="/dashboard/posts/new">New Post</NavLink>

          <div className="my-4 h-px bg-zinc-200 dark:bg-zinc-800" />

          <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
            Logout
          </button>
        </nav>
      </aside>

      <div className="ml-64 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Welcome back
          </h2>
          <ThemeToggle />
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

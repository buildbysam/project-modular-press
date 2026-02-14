import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Posts" value="12" />
        <StatCard label="Published" value="8" />
        <StatCard label="Drafts" value="4" />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/dashboard/posts/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-zinc-50 dark:text-zinc-900 cursor-pointer"
        >
          Create New Post
        </Link>
        <Link
          href="/dashboard/posts"
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:opacity-90 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
        >
          Manage Posts
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
    </div>
  );
}

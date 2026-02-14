export default function PostForm({ initialData }: { initialData?: any }) {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Editor Area */}
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 inline-block">
              Title
            </label>
            <input
              type="text"
              defaultValue={initialData?.title}
              className="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
              placeholder="Enter post title..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 inline-block">
              Content
            </label>
            <textarea
              rows={15}
              defaultValue={initialData?.content}
              className="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2 text-sm font-mono placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
              placeholder="Write your markdown content here..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 inline-block">
              Excerpt
            </label>
            <textarea
              rows={3}
              defaultValue={initialData?.excerpt}
              className="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
              placeholder="Short description for SEO..."
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Publishing
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">
                  Status
                </label>
                <select className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-200">
                  <option className="text-zinc-900">Draft</option>
                  <option className="text-zinc-900">Published</option>
                  <option className="text-zinc-900">Archived</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">
                  Slug
                </label>
                <input
                  type="text"
                  defaultValue={initialData?.slug}
                  className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700"
                />
              </div>

              <button className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-zinc-50 dark:text-zinc-900 cursor-pointer">
                {initialData ? "Update Post" : "Create Post"}
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Organization
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">
                  Categories
                </label>
                <select className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-200">
                  <option className="text-zinc-900">Development</option>
                  <option className="text-zinc-900">Design</option>
                  <option className="text-zinc-900">Life</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="React, CSS, Next.js"
                  className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

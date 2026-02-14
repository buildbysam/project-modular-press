export default function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-800" />
    </div>
  );
}

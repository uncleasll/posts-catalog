export default function PostSkeleton() {
  return (
    <div className="card p-6 flex flex-col gap-3">
      <div className="skeleton h-5 w-24 rounded-sm" />
      <div className="skeleton h-6 w-3/4 rounded-sm" />
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded-sm" />
        <div className="skeleton h-4 w-5/6 rounded-sm" />
        <div className="skeleton h-4 w-4/6 rounded-sm" />
      </div>
      <div className="skeleton h-3 w-32 rounded-sm mt-2" />
    </div>
  );
}

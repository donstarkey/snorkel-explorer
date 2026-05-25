export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-48 skeleton-shimmer"></div>

      <div className="p-4 space-y-3">
        <div className="h-4 skeleton-shimmer rounded w-3/4"></div>
        <div className="h-4 skeleton-shimmer rounded w-1/2"></div>
        <div className="h-4 skeleton-shimmer rounded w-full"></div>
      </div>
    </div>
  );
}


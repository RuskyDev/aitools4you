export default function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-muted p-2 rounded-lg">
          <div className="w-12 h-12 bg-muted rounded"></div>
        </div>
        <div className="h-6 bg-muted rounded w-32"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 bg-muted rounded-full w-16"></div>
        <div className="h-6 bg-muted rounded-full w-20"></div>
        <div className="h-6 bg-muted rounded-full w-14"></div>
      </div>

      <div className="space-y-2 mb-6 flex-grow">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-4/6"></div>
      </div>

      <div className="h-12 bg-muted rounded-lg"></div>
    </div>
  )
}

/** Global route-loading skeleton — fade, no spinner (§39). */
export default function Loading() {
  return (
    <div className="shell py-20">
      <div className="skeleton mb-8 h-4 w-40 rounded-full" />
      <div className="skeleton mb-16 h-16 w-2/3 rounded-image" />
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton aspect-[4/5] rounded-image" />
            <div className="skeleton mt-4 h-4 w-3/4 rounded-full" />
            <div className="skeleton mt-2 h-3 w-1/3 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

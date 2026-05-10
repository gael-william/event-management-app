export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3 text-slate-700">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
        Chargement…
      </div>
    </div>
  );
}

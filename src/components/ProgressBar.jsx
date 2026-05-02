export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-2" aria-label={`진행률 ${current}/${total}`}>
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>{current}/{total}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-q1 via-q2 to-q3 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

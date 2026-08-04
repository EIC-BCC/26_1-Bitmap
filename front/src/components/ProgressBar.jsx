export default function ProgressBar({ percent }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-48 rounded-full bg-neutral-200">
        <div
          className="h-2 rounded-full bg-blue-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="font-bold">{percent}%</span>
    </div>
  );
}

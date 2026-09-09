export default function SpecialistCard({ specialist, onSend }) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-700">
          {specialist.name
            .split(" ")
            .map((w) => w[0])
            .slice(-2)
            .join("")}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">
            {specialist.name} <span className="font-normal text-slate-500">({specialist.role})</span>
          </h3>
          <p className="text-sm text-slate-500">
            {specialist.facility} • <strong>{specialist.distanceKm} km away</strong>
          </p>
        </div>
      </div>
      <button
        onClick={() => onSend(specialist)}
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
      >
        Send
      </button>
    </div>
  );
}

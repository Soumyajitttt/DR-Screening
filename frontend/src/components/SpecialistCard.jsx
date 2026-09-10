export default function SpecialistCard({ specialist, onSend }) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] transition hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efeff0] font-tight font-bold text-[#010110]">
          {specialist.name
            .split(" ")
            .map((w) => w[0])
            .slice(-2)
            .join("")}
        </div>
        <div>
          <h3 className="font-tight font-semibold text-[#010110]">
            {specialist.name} <span className="font-normal text-[#45545e]">({specialist.role})</span>
          </h3>
          <p className="font-tight text-sm text-[#45545e]">
            {specialist.facility} • <strong>{specialist.distanceKm} km away</strong>
          </p>
        </div>
      </div>
      <button
        onClick={() => onSend(specialist)}
        className="rounded-full bg-[#111318] px-4 py-2 font-tight text-sm font-semibold text-white transition hover:bg-black"
      >
        Send
      </button>
    </div>
  );
}

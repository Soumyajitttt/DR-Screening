export default function SpecialistCard({ specialist, onSend }) {
  return (
    <div>
      <div>
        <h3>
          {specialist.name} ({specialist.role})
        </h3>
        <p>
          {specialist.facility} • {specialist.distanceKm} km away
        </p>
      </div>
      <button onClick={() => onSend(specialist)}>Send</button>
    </div>
  );
}

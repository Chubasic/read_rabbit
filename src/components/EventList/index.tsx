type EventListProps = {
  date: string
  label?: string
}
const FAKE_EVENTS: Record<string, string[]> = { // Need to generate this for TODAY and future dates
  "2026-07-14": ["Design review", "1:1 with Sam"],
  "2026-07-15": ["Ship release"],
};

export default function EventList({ date, label = "Events" }: EventListProps) {
  const events = FAKE_EVENTS[date] || [];
  return (
    <div>
      <div className="text-xs font-medium text-neutral-500 mb-1">{label} for {date || "..."}</div>
      {events.length ? (
        <ul className="text-sm space-y-1">
          {events.map((e) => <li key={e} className="bg-neutral-100 rounded px-2 py-1">{e}</li>)}
        </ul>
      ) : (
        <div className="text-sm text-neutral-400 italic">No events</div>
      )}
    </div>
  );
}

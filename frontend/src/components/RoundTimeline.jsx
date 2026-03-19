import { format } from "date-fns";
import { getRoundResultColor } from "../utils/statusColor";

function RoundTimeline({ rounds }) {
  if (!rounds?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
        No rounds added yet
      </div>
    );
  }

  const sortedRounds = [...rounds].sort((a, b) => {
    const aDate = a.roundDate ? new Date(a.roundDate) : new Date(a.createdAt);
    const bDate = b.roundDate ? new Date(b.roundDate) : new Date(b.createdAt);
    return aDate - bDate;
  });

  return (
    <div className="relative pl-10">
      <div className="absolute left-5 top-2 bottom-0 w-px bg-slate-300" />
      {sortedRounds.map((round) => {
        const eventDate = round.roundDate
          ? new Date(round.roundDate)
          : round.createdAt
          ? new Date(round.createdAt)
          : null;

        return (
          <div key={round._id} className="mb-8 relative">
            <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-indigo-600" />
            <div className="pl-6 pt-1 pb-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap justify-between gap-2 items-start">
                <h3 className="text-lg font-semibold text-slate-900">{round.roundName || "Untitled Round"}</h3>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoundResultColor(round.result)}`}
                >
                  {round.result || "Pending"}
                </span>
              </div>

              {eventDate && (
                <p className="text-xs text-slate-500 mt-1"> 
                  {format(eventDate, "PPpp")}
                </p>
              )}

              <p className="text-sm text-slate-600 mt-2">{round.notes || "No notes yet"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RoundTimeline;

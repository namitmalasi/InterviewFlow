import { format } from "date-fns";
import { getRoundResultColor, getOfferStatusColor } from "../utils/statusColor";

function RoundTimeline({ rounds = [], offers = [] }) {
  const events = [
    ...rounds.map((round) => ({
      id: round._id,
      type: "round",
      label: round.roundName || "Interview Round",
      status: round.result || "Pending",
      date: round.date || round.roundDate || round.createdAt,
      notes: round.notes,
    })),
    ...offers.map((offer) => ({
      id: offer._id,
      type: "offer",
      label: "Offer",
      status: offer.status || "Pending",
      // Use createdAt for timeline order; deadline is displayed in details
      date: offer.createdAt,
      notes: `${offer.amount ? `Offer: ${offer.amount}. ` : ""}${
        offer.deadline ? `Deadline: ${format(new Date(offer.deadline), "PP")}. ` : ""
      }${offer.notes || ""}`,
    })),
  ];

  if (!events.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
        No rounds or offers yet
      </div>
    );
  }

  const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="relative pl-10">
      <div className="absolute left-5 top-2 bottom-0 w-px bg-slate-300" />
      {sortedEvents.map((event) => {
        const eventDate = event.date ? new Date(event.date) : null;

        const badgeClasses =
          event.type === "offer"
            ? getOfferStatusColor(event.status)
            : getRoundResultColor(event.status);

        return (
          <div key={event.type + event.id} className="mb-8 relative">
            <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-indigo-600" />
            <div className="pl-6 pt-1 pb-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap justify-between gap-2 items-start">
                <h3 className="text-lg font-semibold text-slate-900">{event.label}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeClasses}`}>
                  {event.status}
                </span>
              </div>

              {eventDate && (
                <p className="text-xs text-slate-500 mt-1">{format(eventDate, "PPpp")}</p>
              )}

              <p className="text-sm text-slate-600 mt-2">{event.notes || "No notes"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RoundTimeline;

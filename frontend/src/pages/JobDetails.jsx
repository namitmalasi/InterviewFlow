import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useJobStore from "../store/jobStore";
import AddRound from "../components/AddRound";
import { getRoundResultColor } from "../utils/statusColor";

function JobDetails() {
  const { id } = useParams();
  const { rounds, fetchRounds, deleteRound } = useJobStore();

  useEffect(() => {
    if (id) fetchRounds(id);
  }, [id]);

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-slate-900">
        Interview Rounds
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-6">
        <p className="text-sm text-slate-500">
          For this job, add and track each interview round outcome.
        </p>
      </div>

      <AddRound jobId={id} />

      <div className="space-y-4 mt-6">
        {rounds?.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
            No rounds added yet
          </div>
        )}

        {rounds?.map((round) => (
          <div
            key={round._id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-wrap justify-between items-start gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {round.roundName}
                </h2>
                <p className="text-sm text-slate-500">
                  {round.notes || "No notes yet"}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoundResultColor(round.result)}`}
              >
                {round.result}
              </span>
            </div>

            <div className="mt-4">
              <button
                onClick={() => deleteRound(round._id)}
                className="rounded-md border border-red-500 px-3 py-1 text-red-500 font-medium hover:bg-red-500 hover:text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobDetails;

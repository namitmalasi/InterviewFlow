import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useJobStore from "../store/jobStore";
import AddRound from "../components/AddRound";
import RoundTimeline from "../components/RoundTimeline";

function JobDetails() {
  const { id } = useParams();
  const { rounds, fetchRounds } = useJobStore();

  useEffect(() => {
    if (id) fetchRounds(id);
  }, [id]);

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-slate-900">
        Interview Timeline
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-6">
        <p className="text-sm text-slate-500">
          For this job, add and track each interview round outcome.
        </p>
      </div>

      <AddRound jobId={id} />

      <div className="space-y-6 mt-6">
        <RoundTimeline rounds={rounds} />
      </div>
    </div>
  );
}

export default JobDetails;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useJobStore from "../store/jobStore";
import AddRound from "../components/AddRound";

function JobDetails() {
  const { id } = useParams();

  const { rounds, fetchRounds, deleteRound } = useJobStore();
  console.log("rounds:", rounds);

  useEffect(() => {
    if (id) fetchRounds(id);
  }, [id]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Interview Rounds</h1>

      <AddRound jobId={id} />

      <div className="space-y-4 mt-6">
        {rounds?.length === 0 && <p>No rounds added yet</p>}

        {rounds?.map((round) => (
          <div key={round._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{round.roundName}</h2>

            <p>Result: {round.result}</p>

            <p className="text-gray-500 text-sm">{round.notes}</p>

            <button
              onClick={() => deleteRound(round._id)}
              className="text-red-500 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobDetails;

import { useState } from "react";
import useJobStore from "../store/jobStore";

function AddRound({ jobId }) {
  const addRound = useJobStore((state) => state.addRound);

  const [form, setForm] = useState({
    roundName: "",
    result: "Pending",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobId) return;

    await addRound(jobId, form);

    setForm({
      roundName: "",
      result: "Pending",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
      <h2 className="font-semibold mb-3">Add Interview Round</h2>

      <input
        type="text"
        placeholder="Round Name"
        value={form.roundName}
        onChange={(e) => setForm({ ...form, roundName: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <select
        value={form.result}
        onChange={(e) => setForm({ ...form, result: e.target.value })}
        className="border p-2 w-full mb-2"
      >
        <option value="Pending">Pending</option>
        <option value="Pass">Pass</option>
        <option value="Fail">Fail</option>
      </select>

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Round
      </button>
    </form>
  );
}

export default AddRound;

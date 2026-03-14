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
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg mb-6"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Add Interview Round
      </h2>

      <input
        type="text"
        placeholder="Round Name"
        value={form.roundName}
        onChange={(e) => setForm({ ...form, roundName: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      <select
        value={form.result}
        onChange={(e) => setForm({ ...form, result: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option value="Pending">Pending</option>
        <option value="Pass">Pass</option>
        <option value="Fail">Fail</option>
      </select>

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 h-24 resize-none"
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow hover:from-indigo-700 hover:to-cyan-600 transition"
      >
        Add Round
      </button>
    </form>
  );
}

export default AddRound;

import { useState } from "react";
import useJobStore from "../store/jobStore";

function AddJob() {
  const addJob = useJobStore((state) => state.addJob);

  const [form, setForm] = useState({
    companyName: "",
    role: "",
    status: "Applied",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addJob(form);

    setForm({
      companyName: "",
      role: "",
      status: "Applied",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white border border-slate-200 rounded-2xl shadow-lg p-6"
    >
      <h2 className="text-xl font-bold mb-4 text-slate-700">Add New Job</h2>

      <input
        type="text"
        placeholder="Company Name"
        value={form.companyName}
        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        className="border border-slate-300 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Role"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="border border-slate-300 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="border border-slate-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option>Applied</option>
        <option>OA</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition">
        Add Job
      </button>
    </form>
  );
}

export default AddJob;

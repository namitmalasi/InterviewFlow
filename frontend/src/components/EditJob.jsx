import { useState } from "react";
import useJobStore from "../store/jobStore";

function EditJob({ job }) {
  const updateJob = useJobStore((state) => state.updateJob);

  const [form, setForm] = useState({
    companyName: job.companyName,
    role: job.role,
    status: job.status,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateJob(job._id, form);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
      <h2 className="font-semibold mb-3">Edit Job</h2>

      <input
        type="text"
        value={form.companyName}
        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="border p-2 w-full mb-2"
      >
        <option>Applied</option>
        <option>OA</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Update Job
      </button>
    </form>
  );
}

export default EditJob;

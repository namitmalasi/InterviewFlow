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
    <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded">
      <h2 className="text-lg font-semibold mb-3">Add Job</h2>

      <input
        type="text"
        placeholder="Company Name"
        value={form.companyName}
        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Role"
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
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Job
      </button>
    </form>
  );
}

export default AddJob;

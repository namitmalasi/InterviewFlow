import { useEffect, useMemo, useState } from "react";
import useJobStore from "../store/jobStore";
import AddJob from "../components/AddJob";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "../utils/statusColor.js";

function Dashboard() {
  const { jobs, fetchJobs, deleteJob } = useJobStore();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredJobs = useMemo(() => {
    const text = searchText.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      const matchesText =
        text === "" ||
        job.companyName.toLowerCase().includes(text) ||
        job.role.toLowerCase().includes(text);

      return matchesStatus && matchesText;
    });
  }, [jobs, searchText, statusFilter]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const total = jobs.length;
  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-slate-900">Dashboard</h1>

      {/* Stats Section */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Applications
          </p>
          <h2 className="text-3xl font-bold text-slate-800">{total}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Interviews
          </p>
          <h2 className="text-3xl font-bold text-slate-800">{interviews}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Offers
          </p>
          <h2 className="text-3xl font-bold text-slate-800">{offers}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Rejected
          </p>
          <h2 className="text-3xl font-bold text-slate-800">{rejected}</h2>
        </div>
      </div>

      <AddJob />

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-end gap-3 mt-5 mb-5">
        <div className="flex-1">
          <label
            className="block text-sm text-slate-600 mb-1"
            htmlFor="job-search"
          >
            Search by company or role
          </label>
          <input
            id="job-search"
            className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            placeholder="Search jobs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="w-full md:w-40">
          <label
            className="block text-sm text-slate-600 mb-1"
            htmlFor="status-filter"
          >
            Status filter
          </label>
          <select
            id="status-filter"
            className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button
          className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold"
          onClick={() => {
            setSearchText("");
            setStatusFilter("All");
          }}
        >
          Reset
        </button>
      </div>

      {/* Job List */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl shadow-inner border border-dashed border-slate-300">
          <p className="text-xl font-semibold mb-2 text-slate-700">
            No job applications yet
          </p>
          <p className="text-slate-500 mb-4">Start tracking your interviews</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="bg-white rounded-2xl shadow-md p-6 border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {job.companyName}
                </h2>

                <p className="text-gray-500">{job.role}</p>
              </div>

              {/* <span
                className={`px-3 py-1 text-sm rounded-full
        ${job.status === "Applied" && "bg-blue-100 text-blue-600"}
        ${job.status === "Interview" && "bg-yellow-100 text-yellow-600"}
        ${job.status === "Offer" && "bg-green-100 text-green-600"}
        ${job.status === "Rejected" && "bg-red-100 text-red-600"}`}
              >
                {job.status}
              </span> */}
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(job.status)}`}
              >
                {job.status}
              </span>
            </div>

            <div className="mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteJob(job._id);
                }}
                className="text-red-500 text-sm font-semibold border border-red-500 rounded-lg px-3 py-1 hover:bg-red-500 hover:text-white transition"
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

export default Dashboard;

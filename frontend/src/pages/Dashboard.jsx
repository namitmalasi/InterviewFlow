import { useEffect } from "react";
import useJobStore from "../store/jobStore";
import AddJob from "../components/AddJob";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "../utils/statusColor.js";

function Dashboard() {
  const { jobs, fetchJobs, deleteJob } = useJobStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const total = jobs.length;
  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Section */}

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Applications</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Interviews</p>
          <h2 className="text-3xl font-bold">{interviews}</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Offers</p>
          <h2 className="text-3xl font-bold">{offers}</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Rejected</p>
          <h2 className="text-3xl font-bold">{rejected}</h2>
        </div>
      </div>

      <AddJob />

      {/* Job List */}
      {jobs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl font-medium mb-2">No job applications yet</p>

          <p className="text-gray-500 mb-4">Start tracking your interviews</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="bg-white rounded-lg shadow-sm p-5 hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{job.companyName}</h2>

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
                className="text-red-500 text-sm cursor-pointer background-transparent border border-red-500 rounded px-3 py-1 hover:bg-red-500 hover:text-white transition"
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

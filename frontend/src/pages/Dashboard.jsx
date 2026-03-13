import { useEffect } from "react";
import useJobStore from "../store/jobStore";
import AddJob from "../components/AddJob";
import { useNavigate } from "react-router-dom";

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
      <h1 className="text-3xl font-bold mb-6">Job Tracker Dashboard</h1>

      {/* Stats Section */}

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Applications</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Interviews</p>
          <h2 className="text-2xl font-bold">{interviews}</h2>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Offers</p>
          <h2 className="text-2xl font-bold">{offers}</h2>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Rejected</p>
          <h2 className="text-2xl font-bold">{rejected}</h2>
        </div>
      </div>

      <AddJob />

      {/* Job List */}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="bg-white shadow rounded p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{job.companyName}</h2>

            <p className="text-gray-600">{job.role}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-sm rounded 
              ${job.status === "Applied" && "bg-blue-100 text-blue-600"}
              ${job.status === "Interview" && "bg-yellow-100 text-yellow-600"}
              ${job.status === "Offer" && "bg-green-100 text-green-600"}
              ${job.status === "Rejected" && "bg-red-100 text-red-600"}`}
            >
              {job.status}
            </span>

            <div className="mt-3">
              <button
                onClick={() => deleteJob(job._id)}
                className="text-red-500 text-sm"
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

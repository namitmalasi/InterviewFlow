import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 bg-white shadow-lg h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Interview Flow</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Dashboard
        </Link>

        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Jobs
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;

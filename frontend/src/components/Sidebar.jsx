import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Sidebar() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <aside className="w-64 min-h-screen sticky top-0 p-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Interview Flow
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Manage your hiring roadmap
        </p>
      </div>

      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="rounded-lg px-4 py-3 transition-colors duration-200 text-slate-100 hover:bg-slate-700 hover:text-white"
        >
          Dashboard
        </Link>

        <button
          className="mt-4 rounded-lg px-4 py-3 bg-rose-500 text-white font-medium hover:bg-rose-400 transition-colors duration-200 text-left"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="mt-8 border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-300">Logged in as</p>
        <p className="text-sm font-semibold">{user?.name}</p>
      </div>
    </aside>
  );
}

export default Sidebar;

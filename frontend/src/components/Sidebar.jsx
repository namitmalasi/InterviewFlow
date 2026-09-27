import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <aside
      id="primary-navigation"
      className={`fixed inset-y-0 left-0 z-40 min-h-screen w-64 transform bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-2xl transition-transform duration-200 md:sticky md:top-0 md:z-auto md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-8 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Interview Flow
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Manage your hiring roadmap
          </p>
        </div>
        <button
          type="button"
          aria-label="Close navigation menu"
          className="-mr-2 -mt-2 flex h-10 w-10 items-center justify-center rounded-md text-2xl text-slate-200 hover:bg-slate-700 md:hidden"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="rounded-lg px-4 py-3 transition-colors duration-200 text-slate-100 hover:bg-slate-700 hover:text-white"
          onClick={onClose}
        >
          Dashboard
        </Link>

        <button
          className="mt-4 rounded-lg px-4 py-3 bg-rose-500 text-white font-medium hover:bg-rose-400 transition-colors duration-200 text-left"
          onClick={() => {
            handleLogout();
            onClose();
          }}
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

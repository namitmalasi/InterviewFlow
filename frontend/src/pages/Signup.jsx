import { useState } from "react";
import useAuthStore from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await register(form);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-800 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white/95 border border-slate-200 p-8 shadow-2xl backdrop-blur"
      >
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          Join Interview Flow to keep track of your applications
        </p>

        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 mb-4 text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 mb-4 text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 mb-6 text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow hover:from-indigo-700 hover:to-cyan-600 transition">
          Signup
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-800 ml-1"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

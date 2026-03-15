import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-800 text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/20">
        <div className="text-2xl font-extrabold tracking-tight">
          Interview Flow
        </div>

        <nav className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 border border-white/30 text-sm font-semibold hover:bg-white/10 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-lg px-4 py-2 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition"
          >
            Signup
          </Link>
        </nav>
      </header>

      <main className="mx-auto px-6 py-24 max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          Take control of your interview pipeline
        </h1>
        <p className="text-lg text-slate-100/90 mb-8">
          Interview Flow helps you track applications, manage interview rounds,
          and move jobs from applied to offer with confidence.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="rounded-xl bg-indigo-500 px-8 py-3 font-semibold text-white shadow-lg hover:bg-indigo-600 transition"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;

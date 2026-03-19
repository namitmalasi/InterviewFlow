import { useEffect, useState } from "react";
import useJobStore from "../store/jobStore";

function OfferSection({ jobId }) {
  const offers = useJobStore((state) => state.offers);
  const fetchOffers = useJobStore((state) => state.fetchOffers);
  const addOffer = useJobStore((state) => state.addOffer);
  const updateOffer = useJobStore((state) => state.updateOffer);

  const [form, setForm] = useState({
    amount: "",
    deadline: "",
    status: "Pending",
    notes: "",
  });

  useEffect(() => {
    if (jobId) fetchOffers(jobId);
  }, [jobId, fetchOffers]);

  const latestOffer = offers?.[offers.length - 1];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobId) return;

    const payload = {
      amount: form.amount,
      deadline: form.deadline || null,
      status: form.status,
      notes: form.notes,
    };

    if (latestOffer) {
      await updateOffer(latestOffer._id, payload);
    } else {
      await addOffer(jobId, payload);
    }

    setForm({ amount: "", deadline: "", status: "Pending", notes: "" });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Offer details</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Offer amount (e.g., $120k)"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="border border-slate-300 rounded-lg p-3"
          />

          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="border border-slate-300 rounded-lg p-3"
          />
        </div>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border border-slate-300 rounded-lg p-3 w-full"
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>

        <textarea
          placeholder="Offer notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="border border-slate-300 rounded-lg p-3 w-full h-24"
        />

        <button className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition">
          {latestOffer ? "Update Offer" : "Create Offer"}
        </button>
      </form>

      {latestOffer && (
        <div className="mt-4 rounded-lg bg-slate-50 p-3 border border-slate-200">
          <p className="text-sm text-slate-500">Latest offer currently: {latestOffer.status}</p>
        </div>
      )}
    </div>
  );
}

export default OfferSection;

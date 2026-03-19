import { useEffect } from "react";
import useAuthStore from "../store/authStore";

function Toast() {
  const toast = useAuthStore((state) => state.toast);
  const clearToast = useAuthStore((state) => state.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  const colorClasses =
    toast.type === "success"
      ? "bg-emerald-500"
      : toast.type === "error"
      ? "bg-rose-500"
      : "bg-slate-800";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`min-w-60 px-4 py-3 rounded-xl text-white shadow-lg ${colorClasses}`}
      >
        {toast.message}
      </div>
    </div>
  );
}

export default Toast;

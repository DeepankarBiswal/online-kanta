import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function PickupSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-teal-400 to-emerald-400 rounded-full mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-white text-2xl font-semibold mb-3">
          Pickup Request Confirmed!
        </h2>

        <p className="text-white/80 mb-6">
          Your scrap pickup request has been received. Our team will contact you
          shortly with confirmation.
        </p>

        <Link to="/">
          <button className="w-full px-6 py-3 bg-white text-slate-900 rounded-full hover:bg-white/90 transition-all shadow-lg">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

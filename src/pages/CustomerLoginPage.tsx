import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/book-pickup");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#305a50] mb-2">
            Online Kanta
          </h1>
          <p className="text-slate-400">Login to book your scrap pickup</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleLogin}
          className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-lg"
        >
          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex gap-3 bg-red-950/30 border border-red-900 rounded p-4">
              <AlertCircle
                className="text-red-400 shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-200">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-3 text-slate-500 pointer-events-none"
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded pl-10 pr-4 py-2.5 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-[#305a50] focus:ring-1 focus:ring-[#305a50] transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-200">
              Password
            </label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-3 text-slate-500 pointer-events-none"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded pl-10 pr-10 py-2.5 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-[#305a50] focus:ring-1 focus:ring-[#305a50] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#305a50] hover:bg-[#10B981] disabled:bg-slate-700 text-white font-medium py-2.5 rounded transition-colors disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/customer/signup"
              className="text-[#10B981] hover:text-[#10B981]/80 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-slate-500 hover:text-slate-400 text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

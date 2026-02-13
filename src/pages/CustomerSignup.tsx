import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export default function CustomerSignup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (fullName.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate("/customer/login");
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center">
          <CheckCircle2 size={64} className="text-[#10B981] mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Account Created!</h1>
          <p className="text-slate-400 mb-6">
            Please check your email to verify your account. Click the
            confirmation link in the email from Supabase.
          </p>
          <div className="bg-blue-950/30 border border-blue-900 rounded p-4 mb-6">
            <p className="text-blue-300 text-sm">
              <strong>✓ Account created with:</strong> {email}
            </p>
            <p className="text-blue-300 text-sm mt-2">
              Check your <strong>Inbox</strong> or <strong>Spam</strong> folder
              for the confirmation email.
            </p>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            You'll be redirected to login in a moment...
          </p>
          <Link
            to="/customer/login"
            className="inline-block px-6 py-2 bg-[#305a50] hover:bg-[#10B981] text-white rounded transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#305a50] mb-2">
            Online Kanta
          </h1>
          <p className="text-slate-400">Create your account</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSignup}
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

          {/* Full Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-200">
              Full Name
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-3 text-slate-500 pointer-events-none"
              />
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded pl-10 pr-4 py-2.5 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-[#305a50] focus:ring-1 focus:ring-[#305a50] transition-colors"
              />
            </div>
          </div>

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
            <p className="text-xs text-slate-500 mt-1">At least 6 characters</p>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-200">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-3 text-slate-500 pointer-events-none"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded pl-10 pr-10 py-2.5 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-[#305a50] focus:ring-1 focus:ring-[#305a50] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#305a50] hover:bg-[#10B981] disabled:bg-slate-700 text-white font-medium py-2.5 rounded transition-colors disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link
              to="/customer/login"
              className="text-[#10B981] hover:text-[#10B981]/80 font-medium transition-colors"
            >
              Login here
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

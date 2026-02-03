import { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const success = login(password);

      if (!success) {
        setError("Invalid password, Please try again.");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/*Glassmorphism Card*/}
        <main className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
          {/*Lock Icon*/}
          <nav className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </nav>

          {/*Header*/}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-blue-200">Enter password to access dashboard</p>
          </header>

          {/*Error Message*/}
          {error && (
            <aside className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center gap-3">
              <AlertCircle className="text-red-300" />
              <p className="text-red-200">{error}</p>
            </aside>
          )}

          {/*Login Form*/}
          <section className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Password
              </label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition pr-12"
                  placeholder="Enter admin password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100 transition"
                  aria-label={showPassword ? "Hide password" : "show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !password}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Access Dashboard
                </>
              )}
            </button>
          </section>

          <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
            <p className="text-xs text-yellow-200 text-center">
              🔑 Demo Password:{" "}
              <span className="font-mono font-semibold text-white/60 hover:text-white/100">
                Admin@0022
              </span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;

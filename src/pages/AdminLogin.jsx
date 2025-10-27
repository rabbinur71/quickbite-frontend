import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../theme/Theme";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-10"
      style={{
        background: `linear-gradient(to bottom right, ${theme.colors.primaryStart}, ${theme.colors.primaryEnd})`,
        fontFamily: theme.fonts.body,
      }}
    >
      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-amber-100">
        {/* Header */}
        <div className="py-8 px-6 text-center">
          <h2
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: theme.fonts.heading,
              backgroundImage: `linear-gradient(to right, ${theme.colors.primaryStart}, ${theme.colors.primaryEnd})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            QuickBite Admin
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            Sign in to manage your restaurant
          </p>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm shadow-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`${theme.buttonStyles.primary} w-full text-center flex justify-center items-center py-3`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {/* Demo Credentials (Optional) */}
          {/* <div className="mt-6 bg-orange-50 border border-orange-100 p-4 rounded-lg text-center text-sm text-gray-600">
            <p className="font-medium">Demo Credentials</p>
            <p>Email: admin@quickbite.com</p>
            <p>Password: admin123</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

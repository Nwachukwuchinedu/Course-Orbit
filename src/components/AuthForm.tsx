// AuthForm.tsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

interface AuthFormProps {
  type: "login" | "signup" | "forgotPassword" | "resetPassword";
  onSubmit?: (data: {
    email: string;
    password?: string;
    name?: string;
    token?: string;
  }) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuthContext();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (type === "signup" && !formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (
      (type === "signup" || type === "login" || type === "resetPassword") &&
      !formData.password
    ) {
      newErrors.password = "Password is required";
    } else if (
      formData.password.length < 6 &&
      (type === "signup" || type === "resetPassword")
    ) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (type === "resetPassword" && !formData.token) {
      newErrors.token = "Reset token is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const apiLoginUrl = import.meta.env.VITE_API_URL_LOGIN;
  const apiSignupUrl = import.meta.env.VITE_API_URL_SIGNUP;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (type === "signup") {
          const response = await axios.post(apiSignupUrl, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          alert("Account created successfully.");
          navigate("/login");
        } else if (type === "login") {
          const response = await axios.post(apiLoginUrl, {
            email: formData.email,
            password: formData.password,
          });
          const token = response.data.token;
          localStorage.setItem("jwtToken", token); // Save token
          setIsAuthenticated(true);
          navigate("/dashboard"); // Redirect to dashboard after login
        }
      } catch (err) {
        console.error(err);
        alert("Authentication failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {type === "signup"
            ? "Sign up for an account"
            : "Sign in to your account"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {type === "signup" && (
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {type === "login" ? (
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-400"
              >
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-400"
              >
                Log in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Orbit } from "lucide-react";
import { useAuthContext } from "../components/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const onLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 shadow-md border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <Orbit className="h-8 w-8 text-blue-500" />
            <span className="font-bold text-xl">Course Orbit</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated && (
              <Link
                to="/"
                className="hover:text-white hover:bg-blue-500 transition-colors px-2 py-1 rounded-md"
              >
                Home
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-white hover:bg-blue-500 transition-colors px-2 py-1 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="/pricing"
                  className="hover:text-white hover:bg-blue-500 transition-colors px-2 py-1 rounded-md"
                >
                  Pricing
                </Link>
                <button
                  onClick={onLogout} // Logout functionality
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-white hover:bg-blue-500 transition-colors px-2 py-1 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black hover:text-blue-400 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-md border-t border-gray-200">
              {!isAuthenticated && (
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md hover:text-white hover:bg-blue-500 transition-colors"
                >
                  Home
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md hover:text-white hover:bg-blue-500 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/pricing"
                    className="block px-3 py-2 rounded-md hover:text-white hover:bg-blue-500 transition-colors"
                  >
                    Pricing
                  </Link>
                  <button
                    onClick={onLogout} // Logout functionality
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md hover:text-white hover:bg-blue-500 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md hover:text-white hover:bg-blue-500 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

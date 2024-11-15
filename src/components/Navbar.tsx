import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Orbit } from "lucide-react";
import { useAuthContext } from "../components/AuthContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const onLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    setIsOpen(false); // Close the menu after logout
    navigate("/login");
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu after clicking a link
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm text-black">
      {/* Outer container now stretches the full width */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Navbar content */}
        <div className="flex items-center justify-between h-16 shadow-md border-b border-gray-200 w-full">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Course Orbit Logo" className="h-8 w-8" />
            <span className="font-bold text-xl">Course Orbit</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated && (
              <Link
                to="/"
                className="hover:text-blue-500 transition-colors px-2 py-1 rounded-md"
              >
                Home
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-500 transition-colors px-2 py-1 rounded-md"
                >
                  Dashboard
                </Link>
                {/* <Link
                  to="/pricing"
                  className="hover:text-blue-500 transition-colors px-2 py-1 rounded-md"
                >
                  Pricing
                </Link> */}
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
                  onClick={handleLinkClick} // Close the menu when clicked
                  className="hover:text-blue-500 transition-colors px-2 py-1 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={handleLinkClick} // Close the menu when clicked
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
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="space-y-2 py-4">
            {!isAuthenticated && (
              <Link
                to="/"
                onClick={handleLinkClick} // Close the menu when clicked
                className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
              >
                Home
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick} // Close the menu when clicked
                  className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
                {/* <Link
                  to="/pricing"
                  onClick={handleLinkClick} // Close the menu when clicked
                  className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                >
                  Pricing
                </Link> */}
                <button
                  onClick={onLogout} // Logout functionality
                  className="block w-full text-left px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleLinkClick} // Close the menu when clicked
                  className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={handleLinkClick} // Close the menu when clicked
                  className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

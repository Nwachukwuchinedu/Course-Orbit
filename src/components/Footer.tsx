import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-200">
              Empowering learners worldwide with cutting-edge online education
              and professional development opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses"
                  className="text-gray-200 hover:text-gray-400 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-200 hover:text-gray-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/about"
                  className="text-gray-200 hover:text-gray-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-200 hover:text-gray-400 transition-colors"
                >
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              {/* <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-200">support@edupro.com</span>
              </div> */}
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-200">
                  <a href="tel:+2349021219747">+234 902 121 9747</a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-200">
                  <a href="tel:+2348089112298">+234 808 911 2298</a>
                </span>

              </div>
            </div>
          </div>
          <div>
            {/* <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-gray-200 hover:text-gray-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                to="#"
                className="text-gray-200 hover:text-gray-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                to="#"
                className="text-gray-200 hover:text-gray-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                to="#"
                className="text-gray-200 hover:text-gray-400 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </Link>
            </div> */}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p className="text-gray-200">
            &copy; {new Date().getFullYear()} Course Orbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

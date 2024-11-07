import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

export default function Footer() {
return (
  <footer className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-blue-300">
            Empowering learners worldwide with cutting-edge online education and
            professional development opportunities.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/courses"
                className="text-blue-300 hover:text-cyan-400 transition-colors"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="text-blue-300 hover:text-cyan-400 transition-colors"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-blue-300 hover:text-cyan-400 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-blue-300 hover:text-cyan-400 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-cyan-400" />
              <span className="text-blue-300">support@edupro.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-cyan-400" />
              <span className="text-blue-300">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-blue-300 hover:text-cyan-400 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-blue-300 hover:text-cyan-400 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-blue-300 hover:text-cyan-400 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-blue-300 hover:text-cyan-400 transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-cyan-700 text-center">
        <p className="text-blue-300">
          &copy; {new Date().getFullYear()} EduPro. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

}
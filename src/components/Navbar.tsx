// Navbar.tsx
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

  // return (
  //   <nav className="fixed w-full z-50 bg-white shadow-sm text-black">
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //       <div className="flex justify-between items-center h-16">
  //         <div>
  //           <Link to="/" className="text-xl font-bold">
  //             MyApp
  //           </Link>
  //         </div>
  //         <div className="hidden md:flex space-x-4">
  //           <Link to="/" className="text-gray-600 hover:text-black">
  //             Home
  //           </Link>
  //           {isAuthenticated ? (
  //             <>
  //               <Link
  //                 to="/dashboard"
  //                 className="text-gray-600 hover:text-black"
  //               >
  //                 Dashboard
  //               </Link>
  //               <button onClick={onLogout} className="text-red-500">
  //                 Logout
  //               </button>
  //             </>
  //           ) : (
  //             <>
  //               <Link to="/login" className="text-gray-600 hover:text-black">
  //                 Login
  //               </Link>
  //               <Link to="/signup" className="text-gray-600 hover:text-black">
  //                 Signup
  //               </Link>
  //             </>
  //           )}
  //         </div>
  //         <button onClick={toggleMenu} className="md:hidden">
  //           {isOpen ? <X /> : <Menu />}
  //         </button>
  //       </div>
  //     </div>
  //     {isOpen && (
  //       <div className="md:hidden">
  //         <Link to="/" className="block py-2">
  //           Home
  //         </Link>
  //         {isAuthenticated ? (
  //           <>
  //             <Link to="/dashboard" className="block py-2">
  //               Dashboard
  //             </Link>
  //             <button onClick={onLogout} className="block py-2 text-red-500">
  //               Logout
  //             </button>
  //           </>
  //         ) : (
  //           <>
  //             <Link to="/login" className="block py-2">
  //               Login
  //             </Link>
  //             <Link to="/signup" className="block py-2">
  //               Signup
  //             </Link>
  //           </>
  //         )}
  //       </div>
  //     )}
  //   </nav>
  // );


   return (
     <nav className="fixed w-full z-50 bg-white shadow-sm text-black">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between h-16">
           <Link to="/" className="flex items-center space-x-2">
             <Orbit className="h-8 w-8 text-cyan-400" />
             <span className="font-bold text-xl">Course Orbit</span>
           </Link>

           {/* Desktop Menu */}
           <div className="hidden md:flex items-center space-x-8">
             {!isAuthenticated && (
               <Link to="/" className="hover:text-cyan-500 transition-colors">
                 Home
               </Link>
             )}
             {isAuthenticated ? (
               <>
                 <Link
                   to="/dashboard"
                   className="hover:text-cyan-500 transition-colors"
                 >
                   Dashboard
                 </Link>
                 <Link
                   to="/pricing"
                   className="hover:text-cyan-500 transition-colors"
                 >
                   Pricing
                 </Link>
                 <button
                   onClick={onLogout} // Logout functionality
                   className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors"
                 >
                   Logout
                 </button>
               </>
             ) : (
               <>
                 <Link
                   to="/login"
                   className="hover:text-cyan-500 transition-colors"
                 >
                   Login
                 </Link>
                 <Link
                   to="/signup"
                   className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors"
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
               className="text-black hover:text-cyan-500 transition-colors"
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
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               {!isAuthenticated && (
                 <Link
                   to="/"
                   className="block px-3 py-2 rounded-md hover:bg-blue-500 transition-colors"
                 >
                   Home
                 </Link>
               )}
               {isAuthenticated ? (
                 <>
                   <Link
                     to="/dashboard"
                     className="block px-3 py-2 rounded-md hover:bg-blue-500 transition-colors"
                   >
                     Dashboard
                   </Link>
                   <Link
                     to="/pricing"
                     className="block px-3 py-2 rounded-md hover:bg-blue-500 transition-colors"
                   >
                     Pricing
                   </Link>
                   <button
                     onClick={onLogout} // Logout functionality
                     className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-500 transition-colors"
                   >
                     Logout
                   </button>
                 </>
               ) : (
                 <>
                   <Link
                     to="/login"
                     className="block px-3 py-2 rounded-md hover:bg-blue-500 transition-colors"
                   >
                     Login
                   </Link>
                   <Link
                     to="/signup"
                     className="block px-3 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
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

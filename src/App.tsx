// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthForm from "./components/AuthForm";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import Pricing from "./pages/Pricing";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthForm type="login" />} />
              <Route path="/signup" element={<AuthForm type="signup" />} />
              <Route
                path="/dashboard"
                element={
                  // <ProtectedRoute>
                  //   <Dashboard />
                  // </ProtectedRoute>
                  <Dashboard />
                }
              />
              <Route
                path="/course/:courseId"
                element={
                  // <ProtectedRoute>
                  //   <CourseDetails />
                  // </ProtectedRoute>
                  <CourseDetails />
                }
              />
              <Route
                path="/pricing"
                element={
                  <ProtectedRoute>
                    <Pricing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              {/* Add the 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

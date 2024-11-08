import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import Pricing from './pages/Pricing';
import Admin from './pages/Admin';

function App() {
  const handleAuth = (data: { email: string; password: string; name?: string }) => {
    console.log('Auth data:', data);
    // TODO: Implement authentication logic
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={false} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<AuthForm type="login" onSubmit={handleAuth} />}
            />
            <Route
              path="/signup"
              element={<AuthForm type="signup" onSubmit={handleAuth} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
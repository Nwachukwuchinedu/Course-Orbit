import { motion } from 'framer-motion';
import { Clock, Book, Award } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { Course } from '../types';
import { useInView } from 'react-intersection-observer';

const ENROLLED_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced Web Development',
    headline: 'Master modern web technologies and frameworks',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    category: 'Development',
    duration: '40 hours',
    rating: 4.8,
    instructor: 'John Doe',
    language: 'English',
    difficulty: 'Advanced',
    hasCertificate: true,
    hasClosedCaptions: true,
    targetAudience: ['Web Developers', 'Software Engineers'],
    learningOutcomes: ['Master React', 'Build Full-stack Apps'],
    requirements: ['Basic JavaScript', 'HTML & CSS'],
    description: 'Comprehensive web development course',
  },
];

export default function Dashboard() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Welcome back, John! 👋
          </h1>
          <p className="text-blue-600">
            Track your progress and continue learning from where you left off.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white"
          >
            <Clock className="h-8 w-8 mb-4" />
            <h3 className="text-2xl font-bold mb-2">40 Hours</h3>
            <p className="text-blue-100">Total Learning Time</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
          >
            <Book className="h-8 w-8 mb-4" />
            <h3 className="text-2xl font-bold mb-2">5 Courses</h3>
            <p className="text-cyan-100">In Progress</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl shadow-lg p-6 text-white"
          >
            <Award className="h-8 w-8 mb-4" />
            <h3 className="text-2xl font-bold mb-2">3 Certificates</h3>
            <p className="text-blue-100">Earned</p>
          </motion.div>
        </div>

        {/* Enrolled Courses */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-blue-900">
            Your Enrolled Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENROLLED_COURSES.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);
}
import { motion } from 'framer-motion';
import {
  Clock,
  Award,
  Globe,
  BarChart,
  Subtitles,
  User,
  CheckCircle,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Course } from '../types';

const COURSE: Course = {
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
  description: 'Comprehensive web development course covering modern frameworks and best practices.',
};

export default function CourseDetails() {
  const { courseId } = useParams();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
  <div className="min-h-screen bg-gray pt-20">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Course Header */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
      >
        <div className="relative h-64 md:h-96">
          <img
            src={COURSE.imageUrl}
            alt={COURSE.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <span className="bg-blue-500 text-sm px-3 py-1 rounded-full mb-4 inline-block">
              {COURSE.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {COURSE.title}
            </h1>
            <p className="text-lg text-blue-100">{COURSE.headline}</p>
          </div>
        </div>
      </motion.div>

      {/* Course Features */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
      >
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <Clock className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">{COURSE.duration}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <Award className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">Certificate</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <Globe className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">{COURSE.language}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <BarChart className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">{COURSE.difficulty}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <Subtitles className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">Closed Captions</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <User className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">{COURSE.instructor}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Content */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What You'll Learn
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COURSE.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Requirements
            </h2>
            <ul className="space-y-2">
              {COURSE.requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {COURSE.description}
            </p>
          </div>
        </motion.div>

        {/* Enrollment Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">$99</h3>
              <p className="text-gray-600">Lifetime Access</p>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-500 transition-colors duration-300 flex items-center justify-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Enroll Now</span>
            </button>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Full lifetime access</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Certificate of completion</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Downloadable resources</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

}
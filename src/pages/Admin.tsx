import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  DollarSign,
  BarChart,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import { Course } from "../types";

const COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced Web Development",
    headline: "Master modern web technologies and frameworks",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    primary_category: "Development",
    content_info_short: "40 hours",
    rating: 4.8,
    instructors: ["John Doe"],
    language: "English",
    instructional_level_simple: "Advanced",
    has_certificate: true,
    has_closed_caption: true,
    targetAudience: ["Web Developers", "Software Engineers"],
    what_you_will_learn_data: ["Master React", "Build Full-stack Apps"],
    requirements_data: ["Basic JavaScript", "HTML & CSS"],
    description: "Comprehensive web development course",
    id_name: 'string',
    coupon_code: 'string',
  },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("courses");

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">56</h3>
                <p className="text-gray-600">Active Courses</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-4">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">$12,345</h3>
                <p className="text-gray-600">Total Revenue</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-4">
              <BarChart className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">89%</h3>
                <p className="text-gray-600">Completion Rate</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg"
        >
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("courses")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "courses"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("subscriptions")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "subscriptions"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Subscriptions
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "courses" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Manage Courses
                  </h2>
                  <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="h-5 w-5" />
                    <span>Add Course</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Instructor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {COURSES.map((course) => (
                        <tr key={course.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-lg object-cover"
                                  src={course.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {course.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              {course.primary_category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.instructors[0]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.rating}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

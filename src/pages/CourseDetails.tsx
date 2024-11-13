import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Clock,
  Globe,
  BarChart,
  Subtitles,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Course } from "../types";
import axios from "axios";

export default function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling description
  const apiUrlCourses = import.meta.env.VITE_API_URL_COURSES;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get<Course>(
          `${apiUrlCourses}/${courseId}`
        );
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load course details");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        No course data available
      </div>
    );
  }

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
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="bg-blue-500 text-sm px-3 py-1 rounded-full mb-4 inline-block">
                {course.primary_category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-blue-100">{course.headline}</p>
            </div>
          </div>
        </motion.div>

        {/* Course Features */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          <div className="flex items-center space-x-2">
            <Clock className="text-blue-500" />
            <span>{course.content_info_short}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="text-blue-500" />
            <span>
              {course.instructors
                .map((instructor) => Object.keys(instructor)[0])
                .join(", ")}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="text-blue-500" />
            <span>{course.language}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart className="text-blue-500" />
            <span>{course.instructional_level_simple}</span>
          </div>
          <div className="flex items-center space-x-2">
            {course.has_certificate ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <AlertCircle className="text-red-500" />
            )}
            <span>
              {course.has_certificate
                ? "Certificate Included"
                : "No Certificate"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {course.has_closed_caption ? (
              <Subtitles className="text-green-500" />
            ) : (
              <Subtitles className="text-red-500" />
            )}
            <span>
              {course.has_closed_caption
                ? "Closed Captions Available"
                : "No Captions"}
            </span>
          </div>
        </motion.div>

        {/* Additional Course Info */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="relative">
            <p
              className={`text-gray-700 mb-4 leading-8 ${
                !isExpanded ? "max-h-48 overflow-hidden" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: course.description }}
            ></p>
            {!isExpanded && (
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute bottom-0 right-0 p-2 text-blue-500 hover:text-blue-700 transition-all"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>

          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {course.requirements_data.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-2">Learning Outcomes</h3>
          <ul className="list-disc list-inside text-gray-700">
            {course.what_you_will_learn_data.map((outcome, index) => (
              <li key={index}>{outcome}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Floating 'Enroll Now' Button */}
      <div className="fixed bottom-5 right-5">
        <a
          href={`https://www.udemy.com/course/${course.id_name}/?couponCode=${course.coupon_code}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
        >
          Enroll Now
        </a>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [offset, setOffset] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Function to fetch courses
  const fetchCourses = async (newOffset: number) => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:3000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filters: {},
          offset: newOffset,
        }),
      });
      const data = await response.json();
      setCourses((prevCourses) => [...prevCourses, ...data]); // Append new courses
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchCourses(offset); // Initially load courses
  }, [offset]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative h-screen"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3)",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div variants={itemVariants} className="max-w-3xl">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Transform Your Future with Online Learning
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-white mb-8"
            >
              Access world-class education from anywhere. Learn from industry
              experts and advance your career with our comprehensive courses.
            </motion.p>
            <motion.a
              variants={itemVariants}
              href="#courses"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Explore Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Courses Section */}
      <motion.section
        id="courses"
        ref={featuredRef}
        initial="hidden"
        animate={featuredInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            Featured Courses
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {isLoading
              ? // Complex loading placeholder
                Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse bg-white p-6 rounded-lg shadow-md space-y-4"
                    >
                      <div className="bg-gray-200 w-full h-48 rounded-md" />
                      <div className="space-y-2">
                        <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
                        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                        <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
                        <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
                      </div>
                    </div>
                  ))
              : courses.map((course: any) => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CourseCard
                      course={{
                        id: course.id,
                        title: course.title,
                        headline: course.headline,
                        imageUrl: course.image,
                        description: course.description,
                        category: course.category,
                        duration: course.duration,
                        rating: course.rating,
                        instructor: course.instructor,
                        language: course.language,
                        difficulty: course.difficulty,
                        hasCertificate: course.hasCertificate,
                        hasClosedCaptions: course.hasClosedCaptions,
                        targetAudience: course.targetAudience,
                        learningOutcomes: course.learningOutcomes,
                        requirements: course.requirements,
                      }}
                    />
                  </motion.div>
                ))}
          </motion.div>

          {/* Get More Button with Loading Animation */}
          <motion.button
            onClick={() => {
              setIsLoading(true);
              setOffset((prevOffset) => prevOffset + 30);
            }}
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 mr-2"></div>
            ) : (
              "Get More Courses"
            )}
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        animate={featuredInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-50 rounded-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of experience.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-50 rounded-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Flexible Learning
              </h3>
              <p className="text-gray-600">
                Study at your own pace, anywhere and anytime.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-50 rounded-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Certified Courses
              </h3>
              <p className="text-gray-600">
                Earn recognized certificates upon completion.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

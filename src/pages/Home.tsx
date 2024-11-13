import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]); // State to store all courses
  const [offset, setOffset] = useState(30); // State to manage offset for pagination
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [newCoursesLoading, setNewCoursesLoading] = useState(false); // New state for loading new courses

  const hasFetched = useRef(false); // Ref to ensure that we fetch data only once on mount

  
  // Function to fetch courses
  const fetchCourses = async (newOffset: number) => {
    if (isLoading) return; // Prevent fetching if already loading
    setIsLoading(true); // Start loading
    setNewCoursesLoading(true); // Indicate new courses are loading
    try {
      const response = await fetch(
        "https://course-orbit-api.onrender.com/api/courses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filters: {},
            offset: newOffset,
          }),
        }
      );
      const data = await response.json();

      // Add the new courses to the existing ones
      // setCourses((prevCourses) => [...prevCourses, ...data]);
      // Check if new courses are already in the state, and avoid adding duplicates
      setCourses((prevCourses) => {
        const existingCourseIds = new Set(
          prevCourses.map((course) => course.id)
        );
        const newCourses = data.filter(
          (course: any) => !existingCourseIds.has(course.id)
        );
        return [...prevCourses, ...newCourses]; // Add only new courses
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false); // Stop loading
      setNewCoursesLoading(false); // New courses loading done
    }
  };

  // This effect runs only once when the component mounts (on initial load)
  useEffect(() => {
    if (!hasFetched.current) {
      fetchCourses(offset); // Fetch the first batch of courses when the page loads
      hasFetched.current = true; // Ensure it only runs once
    }
  }, []); // Empty dependency array ensures it only runs once on mount

  // Function to load more courses when the user clicks a button
  const handleLoadMore = () => {
    const newOffset = offset + 30; // Increase offset by 30 for next batch
    setOffset(newOffset); // Update state with the new offset
    fetchCourses(newOffset); // Fetch more courses with the updated offset
  };


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
        initial="hidden"
        animate="visible"
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
        <div className="absolute inset-0 bg-black opacity-70" />
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
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
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
        initial="hidden"
        animate="visible"
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
            {isLoading && !newCoursesLoading
              ? // Complex loading placeholder for the first set of courses
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
                        image: course.image,
                        description: course.description,
                        primary_category: course.primary_category,
                        content_info_short: course.content_info_short,
                        rating: course.rating,
                        instructors: course.instructors,
                        language: course.language,
                        instructional_level_simple:
                          course.instructional_level_simple,
                        has_certificate: course.has_certificate,
                        has_closed_caption: course.has_closed_caption,
                        targetAudience: course.targetAudience,
                        what_you_will_learn_data:
                          course.what_you_will_learn_data,
                        requirements_data: course.requirements_data,
                        id_name: course.id_name,
                        coupon_code: course.coupon_code,
                      }}
                    />
                  </motion.div>
                ))}
            {/* Loading Placeholder for New Courses */}
            {newCoursesLoading &&
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
                ))}
          </motion.div>

          {/* Get More Button with Loading Animation */}
          <motion.button
            onClick={handleLoadMore}
            disabled={isLoading} // Disable the button while loading
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
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
        animate="visible"
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
                Learn from industry experts who are passionate about teaching
                and sharing their knowledge.
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
                Learn at your own pace, anytime, anywhere, with lifetime access
                to course materials.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-50 rounded-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Industry Recognized Certificates
              </h3>
              <p className="text-gray-600">
                Earn certifications that are recognized by top companies and
                enhance your career.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

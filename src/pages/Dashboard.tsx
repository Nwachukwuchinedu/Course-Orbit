import { motion } from "framer-motion";
import { Clock, Book, Award } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Course } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/axios";

interface Course_Interface {
  id: string;
  title: string;
  image: string;
}

export default function Dashboard() {
  const { isAuthenticated, userData } = useAuth(); // Destructure to get userData
  const navigate = useNavigate();

  const [courses, setCourses] = useState<any[]>([]); // State to store all courses
  const [offset, setOffset] = useState(30); // State to manage offset for pagination
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [newCoursesLoading, setNewCoursesLoading] = useState(false); // New state for loading new courses

  const [query, setQuery] = useState<string>("");
  const [fcourses, setfCourses] = useState<Course_Interface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const apiUrlSearchCourses = import.meta.env.VITE_API_URL_SEARCH_COURSES;

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 0) {
      // Only search if input length > 2 characters
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrlSearchCourses}?q=${encodeURIComponent(value)}`
        );
        const result = await response.json();

        if (result.success) {
          setfCourses(result.data);
        } else {
          setfCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setfCourses([]);
      }
      setLoading(false);
    } else {
      setfCourses([]);
    }
  };

  const hasFetched = useRef(false); // Ref to ensure that we fetch data only once on mount
  const apiUrlCourses = import.meta.env.VITE_API_URL_COURSES;
  // Function to fetch courses
  const fetchCourses = async (newOffset: number) => {
    if (isLoading) return; // Prevent fetching if already loading
    setIsLoading(true); // Start loading
    setNewCoursesLoading(true); // Indicate new courses are loading
    try {
      const response = await fetch(apiUrlCourses, {
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

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Or a loader component
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pt-20">
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
              Welcome back, {userData?.name || ""}! 👋
            </h1>
            <p className="text-blue-600">
              Track your progress and continue learning from where you left off.
            </p>
          </motion.div>

          {/* Stats Section */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div> */}
          {/* <>
            {!userData?.paid ? (
              <></>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Search for a course..."
                  value={query}
                  onChange={handleSearch}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {loading && <p className="text-gray-500 mt-2">Loading...</p>}
                <ul className="mt-4 space-y-4">
                  {fcourses.map((course) => (
                    <Link to={`/course/${course.id}`}>
                      <li
                        key={course.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-md shadow-md"
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div>
                          <h4 className="text-lg font-semibold">
                            {course.title}
                          </h4>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </>
            )}
          </> */}

          {/* Enrolled Courses */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            {/* <h2 className="text-2xl font-bold text-blue-900">
              Your Enrolled Courses
            </h2> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ENROLLED_COURSES.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div> */}

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
                          <Link to={`/course/${course.id}`}>
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
                          </Link>
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
                  className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 transition-colors"
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
                      Learn from industry experts who are passionate about
                      teaching and sharing their knowledge.
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
                      Learn at your own pace, anytime, anywhere, with lifetime
                      access to course materials.
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
                      Earn certifications that are recognized by top companies
                      and enhance your career.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

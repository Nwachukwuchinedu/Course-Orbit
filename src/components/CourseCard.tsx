import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => {
      const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));
      return (
        <div key={index} className="relative">
          <Star className="h-5 w-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
          </div>
        </div>
      );
    });
  };

return (
  <motion.div
    onClick={onClick}
    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="relative h-48">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-white bg-opacity-80 text-sm text-gray-800 rounded shadow-lg backdrop-blur-lg">
        {course.primary_category}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {course.title}
      </h3>
      <p className="text-gray-500 text-sm mb-4">{course.headline}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {renderStars(course.rating)}
          <span className="ml-2 text-blue-700">{course.rating.toFixed(1)}</span>
        </div>
        <span className="text-blue-500 text-sm">
          {course.content_info_short}
        </span>
      </div>
    </div>
  </motion.div>
);

}
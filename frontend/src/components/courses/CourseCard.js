import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';

const CourseCard = ({ course }) => {
  const getDifficultyColor = (difficulty) => {
    if (difficulty?.toLowerCase().includes('beginner')) return 'success';
    if (difficulty?.toLowerCase().includes('advanced')) return 'danger';
    if (difficulty?.toLowerCase().includes('intermediate')) return 'warning';
    return 'warning'; // default
  };

  return (
    <Link to={`/courses/${course._id}`}>
      <Card hover className="h-full">
        {/* Thumbnail */}
        <div className="aspect-video bg-gray-200 overflow-hidden">
          <img
            src={course.thumbnailUrl || course.thumbnail || 'https://via.placeholder.com/400x250'}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category & Difficulty */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="primary">{course.category}</Badge>
            <Badge variant={getDifficultyColor(course.difficulty)}>
              {course.difficulty}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Instructor */}
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {course.instructor?.name || 'Instructor'}
            </div>

            {/* Price */}
            <div className="text-lg font-bold text-indigo-600">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </div>
          </div>

          {/* Rating */}
          {course.rating > 0 && (
            <div className="flex items-center mt-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(course.rating) ? 'fill-current' : 'fill-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {course.rating.toFixed(1)} ({course.reviews?.length || 0})
              </span>
            </div>
          )}

          {/* Lessons Count */}
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {course.lessons?.length || 0} Lessons
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { enrollmentAPI } from '../../services/api';

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getMyEnrollments();
      // Filter out enrollments with null/deleted courses
      const validEnrollments = (response.data.data || []).filter(e => e.course);
      setEnrollments(validEnrollments);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'success';
    if (progress >= 50) return 'primary';
    return 'warning';
  };

  const stats = {
    enrolled: enrollments?.length || 0,
    inProgress: enrollments?.filter(e => e.progress > 0 && e.progress < 100).length || 0,
    completed: enrollments?.filter(e => e.progress === 100).length || 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your learning progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {stats.enrolled}
              </div>
              <div className="text-gray-600">Enrolled Courses</div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stats.inProgress}
              </div>
              <div className="text-gray-600">In Progress</div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.completed}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
          </Card>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Enrolled Courses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>

          {!enrollments || enrollments.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No courses yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start learning by enrolling in a course
              </p>
              <Link to="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments?.filter(enrollment => enrollment.course).map((enrollment) => (
                <Card key={enrollment._id} className="hover:shadow-lg transition-shadow duration-200">
                  {(enrollment.course?.thumbnailUrl || enrollment.course?.thumbnail) && (
                    <img
                      src={enrollment.course.thumbnailUrl || enrollment.course.thumbnail || 'https://via.placeholder.com/400x250'}
                      alt={enrollment.course.title}
                      className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {enrollment.course.title}
                    </h3>
                    
                    <div className="flex gap-2 mb-4">
                      <Badge variant="primary">{enrollment.course.category}</Badge>
                      <Badge variant="secondary">{enrollment.course.difficulty}</Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">{enrollment.progress}%</span>
                      </div>
                      <ProgressBar 
                        progress={enrollment.progress} 
                        variant={getProgressColor(enrollment.progress)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/courses/${enrollment.course._id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      {enrollment.course.lessons && enrollment.course.lessons.length > 0 && (
                        <Link 
                          to={`/courses/${enrollment.course._id}/lessons/${enrollment.course.lessons[0]._id}`}
                          className="flex-1"
                        >
                          <Button className="w-full">
                            {enrollment.progress > 0 ? 'Continue' : 'Start'}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

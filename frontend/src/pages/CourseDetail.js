import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseAPI, enrollmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Spinner from '../components/common/Spinner';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourse();
    if (isAuthenticated) {
      checkEnrollment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthenticated]);

  const fetchCourse = async () => {
    try {
      const { data } = await courseAPI.getCourse(id);
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const response = await enrollmentAPI.getEnrollment(id);
      setEnrollment(response.data.data || response.data);
    } catch (error) {
      // Not enrolled
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setEnrolling(true);
      const response = await enrollmentAPI.enrollCourse(id);
      setEnrollment(response.data.data || response.data); // Update enrollment state immediately
      
      // Open YouTube video in a new window with specific size
      if (course.lessons && course.lessons.length > 0) {
        const firstLesson = course.lessons.sort((a, b) => a.order - b.order)[0];
        // Extract YouTube video ID from embed URL
        let videoUrl = firstLesson.videoUrl;
        if (videoUrl.includes('embed')) {
          videoUrl = videoUrl.replace('/embed/', '/watch?v=');
        }
        
        // Open in a new window with specific dimensions (small page)
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        
        window.open(
          videoUrl,
          'YouTubeCourse',
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      alert(error.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const handleStartLearning = () => {
    if (course.lessons && course.lessons.length > 0) {
      navigate(`/courses/${id}/lessons/${course.lessons[0]._id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course not found</h2>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="primary">{course.category}</Badge>
                <Badge variant={
                  course.difficulty?.toLowerCase().includes('beginner') ? 'success' :
                  course.difficulty?.toLowerCase().includes('advanced') ? 'danger' : 'warning'
                }>
                  {course.difficulty}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {course.title}
              </h1>

              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {course.instructor?.name}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {course.lessons?.length || 0} Lessons
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {course.enrolledStudents?.length || 0} Students
                </div>
              </div>
            </div>

            {/* Course Lessons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Content</h2>
              {course.lessons && course.lessons.length > 0 ? (
                <div className="space-y-3">
                  {/* Use dynamic embeddedVideos count if available, otherwise show all */}
                  {(() => {
                    const totalVideos = course.totalVideos || course.lessons.length;
                    const embeddedVideos = course.embeddedVideos || course.lessons.length;
                    const lessonsToShow = totalVideos > 50 
                      ? course.lessons.slice(0, embeddedVideos) 
                      : course.lessons;
                    
                    return lessonsToShow
                      .sort((a, b) => a.order - b.order)
                      .map((lesson) => (
                        <div key={lesson._id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-500">
                                  Lesson {lesson.order}
                                </span>
                              </div>
                              <h3 className="font-semibold text-gray-800 mb-1">
                                {lesson.title}
                              </h3>
                              {lesson.description && (
                                <p className="text-sm text-gray-600">{lesson.description}</p>
                              )}
                            </div>
                            {lesson.duration && (
                              <div className="ml-4 text-sm text-gray-500">
                                {lesson.duration} min
                              </div>
                            )}
                          </div>
                        </div>
                      ));
                  })()}
                  
                  {/* Show playlist link dynamically based on totalVideos */}
                  {(() => {
                    const totalVideos = course.totalVideos || course.lessons.length;
                    const embeddedVideos = course.embeddedVideos || course.lessons.length;
                    const tutorialLink = course.tutorialLink || course.playlistUrl;
                    
                    return totalVideos > 50 && tutorialLink && (
                      <div className="border-2 border-indigo-200 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-purple-50 mt-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-indigo-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-indigo-900">
                              Continue Learning
                            </h3>
                          </div>
                          <p className="text-indigo-800 font-medium mb-2">
                            Complete the first {embeddedVideos} lessons to unlock the full playlist!
                          </p>
                          <p className="text-indigo-700 mb-4 text-sm">
                            This course has {totalVideos} total lessons. After lesson {embeddedVideos}, continue with the remaining {totalVideos - embeddedVideos} lessons on YouTube.
                          </p>
                          <a
                            href={tutorialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                          >
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            Watch Full Playlist on YouTube
                          </a>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <p className="text-gray-600">No lessons available yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar - Enroll Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img
                  src={course.thumbnailUrl || course.thumbnail || 'https://via.placeholder.com/400x250'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </div>
                {course.price > 0 && (
                  <p className="text-sm text-gray-600">One-time payment</p>
                )}
              </div>

              {enrollment ? (
                <div>
                  <Button
                    variant="success"
                    className="w-full mb-4"
                    onClick={handleStartLearning}
                  >
                    Continue Learning
                  </Button>
                  <div className="text-center text-sm text-green-600 font-semibold mb-4">
                    ✓ Enrolled
                  </div>
                </div>
              ) : (
                <Button
                  variant="primary"
                  className="w-full mb-4"
                  onClick={handleEnroll}
                  loading={enrolling}
                  disabled={enrolling}
                >
                  {enrolling ? 'Enrolling...' : (course.price === 0 ? 'Enroll Now' : 'Buy Now')}
                </Button>
              )}

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Lifetime access
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certificate of completion
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Learn at your own pace
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

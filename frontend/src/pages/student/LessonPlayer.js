import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseAPI, enrollmentAPI } from '../../services/api';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, lessonId]);

  const fetchData = async () => {
    try {
      const [courseRes, enrollmentRes] = await Promise.all([
        courseAPI.getCourse(courseId),
        enrollmentAPI.getEnrollment(courseId),
      ]);

      // Check if user is enrolled
      const enrollmentData = enrollmentRes.data.data || enrollmentRes.data;
      if (!enrollmentData) {
        navigate(`/courses/${courseId}`, { 
          state: { error: 'Please enroll in this course to access lessons.' } 
        });
        return;
      }

      setCourse(courseRes.data);
      setEnrollment(enrollmentData);

      const lesson = courseRes.data.lessons.find(l => l._id === lessonId);
      setCurrentLesson(lesson);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 404 || error.response?.status === 403) {
        navigate(`/courses/${courseId}`, { 
          state: { error: 'You must enroll in this course to access lessons.' } 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async () => {
    try {
      await enrollmentAPI.updateProgress(courseId, lessonId);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  const goToNextLesson = () => {
    const sortedLessons = [...course.lessons].sort((a, b) => a.order - b.order);
    const currentIndex = sortedLessons.findIndex(l => l._id === lessonId);
    if (currentIndex < sortedLessons.length - 1) {
      const nextLesson = sortedLessons[currentIndex + 1];
      navigate(`/courses/${courseId}/lessons/${nextLesson._id}`);
    }
  };

  const goToPreviousLesson = () => {
    const sortedLessons = [...course.lessons].sort((a, b) => a.order - b.order);
    const currentIndex = sortedLessons.findIndex(l => l._id === lessonId);
    if (currentIndex > 0) {
      const prevLesson = sortedLessons[currentIndex - 1];
      navigate(`/courses/${courseId}/lessons/${prevLesson._id}`);
    }
  };

  const isLessonCompleted = () => {
    return enrollment?.completedLessons.includes(lessonId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h2>
          <Button onClick={() => navigate(`/courses/${courseId}`)}>
            Back to Course
          </Button>
        </div>
      </div>
    );
  }

  const sortedLessons = [...course.lessons].sort((a, b) => a.order - b.order);
  const currentIndex = sortedLessons.findIndex(l => l._id === lessonId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
          {/* Main Content */}
          <div className="lg:col-span-3 bg-white">
            {/* Video Player */}
            <div className="aspect-video bg-gray-900 relative">
              {iframeError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white p-8">
                  <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Video Embedding Restricted</h3>
                  <p className="text-gray-300 mb-6 text-center">
                    This video cannot be embedded. Click the button below to watch it on the original platform.
                  </p>
                  <a
                    href={currentLesson.videoUrl.replace('/embed/', '/watch?v=')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
              ) : (
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full"
                  allowFullScreen
                  onError={() => setIframeError(true)}
                />
              )}
            </div>

            {/* Lesson Info */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {currentLesson.title}
                </h1>
                {!isLessonCompleted() && (
                  <Button variant="success" onClick={markAsComplete}>
                    <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mark Complete
                  </Button>
                )}
              </div>

              {isLessonCompleted() && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-700 font-medium">Lesson Completed!</span>
                </div>
              )}

              <p className="text-gray-600 mb-6">{currentLesson.description}</p>

              {currentLesson.content && (
                <div className="prose max-w-none mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Lesson Content</h2>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {currentLesson.content}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Button
                  variant="secondary"
                  onClick={goToPreviousLesson}
                  disabled={currentIndex === 0}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </Button>

                <Button onClick={() => navigate(`/courses/${courseId}`)}>
                  Back to Course
                </Button>

                <Button
                  variant="primary"
                  onClick={goToNextLesson}
                  disabled={currentIndex === sortedLessons.length - 1}
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar - Lesson List */}
          <div className="lg:col-span-1 bg-gray-50 border-l border-gray-200 p-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Course Content</h3>
            <div className="space-y-2">
              {/* Use dynamic embeddedVideos count if available */}
              {(() => {
                const totalVideos = course.totalVideos || course.lessons.length;
                const embeddedVideos = course.embeddedVideos || course.lessons.length;
                const lessonsToShow = totalVideos > 50 
                  ? sortedLessons.slice(0, embeddedVideos) 
                  : sortedLessons;
                
                return lessonsToShow.map((lesson) => (
                  <button
                    key={lesson._id}
                    onClick={() => navigate(`/courses/${courseId}/lessons/${lesson._id}`)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      lesson._id === lessonId
                        ? 'bg-indigo-100 border-2 border-indigo-600'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 mb-1">
                          Lesson {lesson.order}
                        </div>
                        <div className={`font-medium mb-1 text-sm ${
                          lesson._id === lessonId ? 'text-indigo-700' : 'text-gray-800'
                        }`}>
                          {lesson.title}
                        </div>
                        {lesson.duration && (
                          <div className="text-xs text-gray-500">
                            {lesson.duration} min
                          </div>
                        )}
                      </div>
                      {enrollment?.completedLessons.includes(lesson._id) && (
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ));
              })()}
              
              {/* Show playlist link dynamically based on totalVideos */}
              {(() => {
                const totalVideos = course.totalVideos || course.lessons.length;
                const embeddedVideos = course.embeddedVideos || course.lessons.length;
                const tutorialLink = course.tutorialLink || course.playlistUrl;
                
                return totalVideos > 50 && tutorialLink && (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-lg p-4 mt-4">
                    <div className="text-center">
                      <div className="text-xs font-bold text-indigo-900 mb-1">
                        +{totalVideos - embeddedVideos} More Lessons
                      </div>
                      <p className="text-xs text-indigo-700 mb-3 font-medium">
                        Complete lesson {embeddedVideos} to continue on YouTube!
                      </p>
                      <a
                        href={tutorialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-bold rounded-lg shadow-md transition-all duration-200"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        YouTube
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;

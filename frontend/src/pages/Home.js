import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const features = [
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience.',
      icon: '👨‍🏫',
    },
    {
      title: 'Flexible Learning',
      description: 'Study at your own pace, anytime and anywhere.',
      icon: '🎓',
    },
    {
      title: 'Quality Content',
      description: 'Access high-quality video lessons and resources.',
      icon: '📚',
    },
    {
      title: 'Certificates',
      description: 'Earn certificates upon course completion.',
      icon: '🏆',
    },
    {
      title: 'Community',
      description: 'Join a community of learners and grow together.',
      icon: '👥',
    },
    {
      title: 'Affordable',
      description: 'Get the best education at competitive prices.',
      icon: '💰',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Discover thousands of courses from expert instructors. Build skills, earn certificates, and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Explore Courses
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-indigo-600">
                    Get Started Free
                  </Button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-indigo-600">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose EduLearn?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                10K+
              </div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                100+
              </div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                98%
              </div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isAuthenticated ? 'Continue Your Learning Journey' : 'Ready to Start Learning?'}
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            {isAuthenticated 
              ? 'Explore more courses and expand your knowledge. Keep learning!' 
              : 'Join thousands of students already learning on EduLearn. Start your journey today!'}
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </Link>
          )}
          {isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" variant="secondary">
                  Browse All Courses
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
                  My Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

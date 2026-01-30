import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminCourses from './AdminCourses';
import AdminUsers from './AdminUsers';

const Admin = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('users') ? 'users' : 'courses'
  );

  const tabs = [
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'users', label: 'Users', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600">Manage courses and users</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'courses' && <AdminCourses />}
            {activeTab === 'users' && <AdminUsers />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

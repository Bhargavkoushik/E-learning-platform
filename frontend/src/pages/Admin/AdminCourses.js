import React, { useState, useEffect } from 'react';
import { courseAPI } from '../../services/api';
import Button from '../../components/common/Button';
import Input, { TextArea, Select } from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Spinner from '../../components/common/Spinner';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    difficulty: 'Beginner',
    price: 0,
    thumbnail: '',
    isPublished: false,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data } = await courseAPI.getCourses({});
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await courseAPI.updateCourse(editingCourse._id, formData);
      } else {
        await courseAPI.createCourse(formData);
      }
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty: course.difficulty,
      price: course.price,
      thumbnail: course.thumbnail,
      isPublished: course.isPublished,
    });
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.deleteCourse(courseId);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Programming',
      difficulty: 'Beginner',
      price: 0,
      thumbnail: '',
      isPublished: false,
    });
    setEditingCourse(null);
    setShowForm(false);
  };

  const categories = [
    { value: 'Programming', label: 'Programming' },
    { value: 'Design', label: 'Design' },
    { value: 'Business', label: 'Business' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Music', label: 'Music' },
    { value: 'Other', label: 'Other' },
  ];

  const difficulties = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Courses</h2>
        <Button
          variant={showForm ? 'secondary' : 'primary'}
          onClick={() => showForm ? resetForm() : setShowForm(true)}
        >
          {showForm ? 'Cancel' : '+ Add Course'}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingCourse ? 'Edit Course' : 'Create New Course'}
          </h3>
          <form onSubmit={handleSubmit}>
            <Input
              label="Course Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categories}
              />

              <Select
                label="Difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                options={difficulties}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price ($)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />

              <Input
                label="Thumbnail URL"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Publish course</span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                {editingCourse ? 'Update Course' : 'Create Course'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-10 w-16 rounded object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">
                        {course.lessons?.length || 0} lessons
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="primary">{course.category}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={course.isPublished ? 'success' : 'warning'}>
                    {course.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {course.enrolledStudents?.length || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourses;

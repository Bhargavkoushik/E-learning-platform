const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');

dotenv.config();

const sampleCourses = [
  {
    title: 'Full Stack Web Development (Free)',
    description: 'Complete web development course using free YouTube resources.',
    category: 'Programming',
    difficulty: 'Beginner',
    price: 0,
    thumbnail: 'https://img.youtube.com/vi/VSEEb_iyCgk/maxresdefault.jpg',
    isPublished: true,
    lessons: [
      {
        title: 'Web Development Introduction',
        description: 'Introduction to full stack web development',
        videoUrl: 'https://www.youtube.com/embed/VSEEb_iyCgk',
        duration: 90,
        order: 1,
        content: 'Introduction to full stack web development covering frontend and backend.',
      },
    ],
  },
  {
    title: 'Java Programming Full Course (Free)',
    description: 'Learn Java programming fundamentals using a free YouTube playlist.',
    category: 'Programming',
    difficulty: 'Beginner',
    price: 0,
    thumbnail: 'https://img.youtube.com/vi/_3GP0qyTbsI/maxresdefault.jpg',
    isPublished: true,
    lessons: [
      {
        title: 'Java Introduction',
        description: 'Java basics and setup',
        videoUrl: 'https://www.youtube.com/embed/_3GP0qyTbsI',
        duration: 120,
        order: 1,
        content: 'Java basics and setup for beginners.',
      },
    ],
  },
  {
    title: 'Python Programming Full Course (Free)',
    description: 'Complete Python programming course using free YouTube resources.',
    category: 'Programming',
    difficulty: 'Beginner',
    price: 0,
    thumbnail: 'https://img.youtube.com/vi/bPrmA1SEN2k/maxresdefault.jpg',
    isPublished: true,
    lessons: [
      {
        title: 'Python Introduction',
        description: 'Python basics and installation',
        videoUrl: 'https://www.youtube.com/embed/bPrmA1SEN2k',
        duration: 60,
        order: 1,
        content: 'Python basics and installation guide for beginners.',
      },
    ],
  },
  {
    title: 'Machine Learning Full Course (Free)',
    description: 'Learn Machine Learning concepts using free YouTube lectures.',
    category: 'Programming',
    difficulty: 'Intermediate',
    price: 0,
    thumbnail: 'https://img.youtube.com/vi/bPrmA1SEN2k/maxresdefault.jpg',
    isPublished: true,
    lessons: [
      {
        title: 'Machine Learning Introduction',
        description: 'Overview of machine learning',
        videoUrl: 'https://www.youtube.com/embed/bPrmA1SEN2k',
        duration: 90,
        order: 1,
        content: 'Overview of machine learning concepts and algorithms.',
      },
    ],
  },
  {
    title: 'Natural Language Processing (NLP) Full Course',
    description: 'Learn NLP concepts and techniques using free YouTube resources.',
    category: 'Programming',
    difficulty: 'Advanced',
    price: 0,
    thumbnail: 'https://img.youtube.com/vi/fM4qTMfCoak/maxresdefault.jpg',
    isPublished: true,
    lessons: [
      {
        title: 'NLP Introduction',
        description: 'Basics of NLP',
        videoUrl: 'https://www.youtube.com/embed/fM4qTMfCoak',
        duration: 75,
        order: 1,
        content: 'Basics of Natural Language Processing and text analysis.',
      },
    ],
  },
  {
    title: 'Deep Learning Full Course (Free)',
    description: 'Deep Learning concepts explained through free YouTube videos.',
    category: 'Programming',
    difficulty: 'Advanced',
    price: 0,
    thumbnail: 'https://img.youtube.com/vi/YFNKnUhm_-s/maxresdefault.jpg',
    isPublished: true,
    lessons: [
      {
        title: 'Deep Learning Introduction',
        description: 'Introduction to deep learning',
        videoUrl: 'https://www.youtube.com/embed/YFNKnUhm_-s',
        duration: 85,
        order: 1,
        content: 'Introduction to deep learning and neural networks.',
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Create admin user if doesn't exist
    let admin = await User.findOne({ email: 'admin@edulearn.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@edulearn.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Created admin user');
    }

    // Create sample courses
    for (const courseData of sampleCourses) {
      await Course.create({
        ...courseData,
        instructor: admin._id,
      });
    }

    console.log('✅ Sample data seeded successfully!');
    console.log('\nAdmin Credentials:');
    console.log('Email: admin@edulearn.com');
    console.log('Password: admin123');
    console.log(`\nCreated ${sampleCourses.length} sample courses`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

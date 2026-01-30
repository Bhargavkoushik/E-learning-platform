# E-Learning Platform (MERN Stack)

A modern, production-ready E-Learning platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a clean, responsive UI with Tailwind CSS.

## Features

### 🎓 For Students
- Browse and search courses with filters (category, difficulty, search)
- Enroll in courses (free or paid)
- Track learning progress with progress bars
- Watch video lessons with built-in player
- Mark lessons as complete
- View personalized dashboard
- Rate and review courses

### 👨‍🏫 For Instructors/Admins
- Complete course management (CRUD operations)
- Lesson management with ordering
- User management
- View enrollment statistics
- Publish/unpublish courses

### 🎨 UI/UX Highlights
- **Tailwind CSS**: Modern, utility-first styling
- **Responsive Design**: Mobile-first approach
- **Gradient Backgrounds**: Beautiful hero sections
- **Smooth Animations**: Hover effects and transitions
- **Consistent Design System**: Primary colors (Indigo/Blue)
- **Accessibility**: Proper labels, focus states, semantic HTML

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## Project Structure

```
E-Learning Platform/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── userRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Badge.js
    │   │   │   ├── Button.js
    │   │   │   ├── Card.js
    │   │   │   ├── Input.js
    │   │   │   ├── ProgressBar.js
    │   │   │   └── Spinner.js
    │   │   ├── courses/
    │   │   │   └── CourseCard.js
    │   │   ├── layout/
    │   │   │   ├── Navbar.js
    │   │   │   └── Footer.js
    │   │   └── routes/
    │   │       └── ProtectedRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Admin/
    │   │   │   ├── Admin.js
    │   │   │   ├── AdminCourses.js
    │   │   │   └── AdminUsers.js
    │   │   ├── CourseDetail.js
    │   │   ├── Courses.js
    │   │   ├── Dashboard.js
    │   │   ├── Home.js
    │   │   ├── LessonPlayer.js
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── .env.example
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

5. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm start
```

App will run on `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Course Endpoints

#### Get All Courses
```http
GET /api/courses?category=Programming&difficulty=Beginner&search=javascript
```

#### Get Single Course
```http
GET /api/courses/:id
```

#### Create Course (Admin)
```http
POST /api/courses
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "JavaScript Fundamentals",
  "description": "Learn JavaScript from scratch",
  "category": "Programming",
  "difficulty": "Beginner",
  "price": 49.99,
  "thumbnail": "https://...",
  "isPublished": true
}
```

#### Update Course (Admin)
```http
PUT /api/courses/:id
Authorization: Bearer <admin_token>
```

#### Delete Course (Admin)
```http
DELETE /api/courses/:id
Authorization: Bearer <admin_token>
```

### Enrollment Endpoints

#### Enroll in Course
```http
POST /api/enrollments/:courseId
Authorization: Bearer <token>
```

#### Get My Enrollments
```http
GET /api/enrollments
Authorization: Bearer <token>
```

#### Update Progress
```http
PUT /api/enrollments/:courseId/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "lessonId": "lesson_id_here"
}
```

### User Management (Admin)

#### Get All Users
```http
GET /api/users
Authorization: Bearer <admin_token>
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <admin_token>
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer <admin_token>
```

## Default Users for Testing

After setting up, you can create an admin user manually in MongoDB or through registration and update the role to "admin".

To create an admin user via MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## UI Components

### Tailwind Design System

**Colors:**
- Primary: Indigo (indigo-600)
- Secondary: Gray
- Success: Green
- Error: Red
- Warning: Yellow

**Common Components:**
- **Button**: Multiple variants (primary, secondary, outline, danger, success)
- **Card**: Reusable card with hover effects
- **Input**: Form inputs with validation
- **Badge**: Status indicators
- **ProgressBar**: Course progress visualization
- **Spinner**: Loading states

### Page Layouts

**Landing Page:**
- Hero section with gradient background
- Feature cards in 3-column grid
- Statistics section
- Call-to-action sections

**Course Listing:**
- Grid layout (responsive)
- Filter bar with search, category, and difficulty
- Course cards with hover effects

**Course Detail:**
- Two-column layout
- Left: Course information
- Right: Enrollment card (sticky)

**Dashboard:**
- Statistics cards
- Enrolled courses with progress bars

**Admin Panel:**
- Tabbed interface
- CRUD forms
- Data tables with actions

**Lesson Player:**
- Video player (aspect-video)
- Lesson sidebar with navigation
- Progress tracking

## Features in Detail

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes on frontend and backend
- Role-based access control (student/admin)

### Course Management
- CRUD operations for courses
- Lesson management within courses
- Course publishing system
- Category and difficulty filtering
- Search functionality

### Enrollment System
- One-click enrollment
- Progress tracking per course
- Lesson completion tracking
- Progress percentage calculation
- Course completion detection

### User Experience
- Responsive navigation with mobile menu
- Smooth page transitions
- Loading states with spinners
- Error handling with user feedback
- Optimistic UI updates

## Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables
2. Update MongoDB connection string
3. Set NODE_ENV to production
4. Deploy using platform CLI or Git

### Frontend Deployment (Vercel/Netlify)

1. Build the production bundle:
```bash
npm run build
```

2. Set environment variables:
```env
REACT_APP_API_URL=https://your-api-url.com/api
```

3. Deploy the `build` folder

## Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] Video upload functionality
- [ ] Course reviews and ratings
- [ ] Discussion forums
- [ ] Quiz and assessments
- [ ] Certificates generation
- [ ] Email notifications
- [ ] Social authentication
- [ ] Course preview
- [ ] Wishlist functionality

## License

MIT

## Support

For support, email support@edulearn.com or open an issue on GitHub.

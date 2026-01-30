# 🎓 E-Learning Platform (MERN Stack)

A **full-stack, production-focused E-Learning platform** built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with a modern, responsive UI powered by **Tailwind CSS**.  
The platform supports **role-based access**, **course management**, **student enrollments**, and **learning progress tracking**.

---

## 🚀 Overview

This project demonstrates real-world full-stack development concepts including authentication, authorization, RESTful APIs, frontend state management, and scalable project architecture.

### Key Highlights
- JWT-based authentication with role-based access (Student / Admin)
- Admin dashboard for course & user management
- Student dashboard with enrolled courses & progress tracking
- RESTful backend API with protected routes
- Responsive, modern UI using Tailwind CSS

---

## 🎯 Why This Project?

This project was built to showcase:
- End-to-end MERN stack development
- Secure authentication & authorization workflows
- Clean separation of frontend and backend
- Scalable folder structure used in real-world applications
- Practical features commonly found in e-learning platforms

---

## ✨ Features

### 🎓 Student Features
- Browse and search courses
- Filter courses by category and difficulty
- Enroll in free or paid courses
- Watch lessons using a built-in video player
- Track learning progress
- View a personalized dashboard

### 👨‍🏫 Admin Features
- Create, update, and delete courses
- Manage lessons within courses
- Publish or unpublish courses
- View enrollments
- Manage users and roles

### 🎨 UI / UX
- Tailwind CSS utility-first styling
- Fully responsive (mobile-first)
- Reusable UI components
- Loading and error states
- Smooth transitions and hover effects

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs

### Frontend
- React 18
- React Router v6
- Axios
- Tailwind CSS

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/Bhargavkoushik/E-learning-platform.git
cd E-learning-platform
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup (new terminal)

```bash
cd frontend
npm install
npm start
```

* Backend runs on: `http://localhost:5000`
* Frontend runs on: `http://localhost:3000`

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📁 Project Structure

```
E-learning-platform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        ├── services/
        └── App.js
```

---

## 🔐 Authentication & Authorization

* JWT-based authentication
* Protected routes on frontend and backend
* Role-based access control:
  * **Students** → enroll & learn
  * **Admins** → manage users & courses

---

## 📡 API Overview

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Courses

* `GET /api/courses`
* `GET /api/courses/:id`
* `POST /api/courses` (Admin)
* `PUT /api/courses/:id` (Admin)
* `DELETE /api/courses/:id` (Admin)

### Enrollments

* `POST /api/enrollments/:courseId`
* `GET /api/enrollments`
* `PUT /api/enrollments/:courseId/progress`

---

## 🧪 Testing Admin Role

After registering a user, update their role to admin in MongoDB:

```js
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 🚀 Deployment

### Backend Deployment (Render)

The backend is deployed using **Render**.

**Steps:**

1. Create a new **Web Service** on Render
2. Connect this GitHub repository
3. Select the `backend` folder as the root
4. Set build & start commands:
   ```bash
   npm install
   npm start
   ```
5. Add environment variables:
   ```env
   PORT=5000
   MONGODB_URI=<your_mongodb_atlas_uri>
   JWT_SECRET=<your_secret_key>
   NODE_ENV=production
   ```
6. Deploy the service

Backend URL:
```
https://<your-render-backend-url>/api
```

---

### Frontend Deployment (Vercel)

The frontend is deployed using **Vercel**.

**Steps:**

1. Create a new project on Vercel
2. Import this GitHub repository
3. Select the `frontend` folder
4. Set environment variable:
   ```env
   REACT_APP_API_URL=https://<your-render-backend-url>/api
   ```
5. Deploy the project

Frontend URL:
```
https://<your-vercel-app>.vercel.app
```

---

### ⚠️ Important Notes

* Enable **CORS** on the backend for the Vercel frontend domain
* Use **MongoDB Atlas** for production databases
* Never commit `.env` files
* Update frontend API URL if backend URL changes

---

## 🔮 Future Enhancements

* Payment integration (Stripe)
* Course reviews and ratings
* Quizzes and assessments
* Certificates generation
* Email notifications
* Social authentication
* Discussion forums

---

## 📜 License

MIT License

---

## 🤝 Contributing

Contributions are welcome.
Feel free to open an issue or submit a pull request.

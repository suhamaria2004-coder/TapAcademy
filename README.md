# 🕒 Employee Attendance System

A modern, full-stack web application for tracking employee attendance with role-based access control, real-time check-in/check-out functionality, and comprehensive analytics dashboard.

## ✨ Features

### For Employees
- 🔐 Secure authentication and registration
- ⏰ Real-time check-in and check-out
- 📊 Personal attendance history
- 📈 Individual productivity tracking
- 👤 Profile management

### For Managers
- 📋 View all employee attendance records
- 📊 Department-wise analytics
- 📈 Productivity reports and insights
- 👥 Employee management
- 🔍 Advanced filtering and search

### General
- 🎨 Modern, responsive UI with Tailwind CSS
- 🚀 Fast and efficient performance
- 🔒 Secure JWT-based authentication
- 📱 Mobile-friendly design
- 🌐 Cloud-ready architecture

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **MongoDB Compass** (optional, for GUI) - [Download](https://www.mongodb.com/products/compass)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/employee-attendance-system.git
cd employee-attendance-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the contents below into backend/.env
```

**backend/.env**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/attendance
JWT_SECRET=your_super_secret_jwt_key_here_12345
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

### 4. Start MongoDB

**Windows:**
```bash
# Option 1: As Administrator
net start MongoDB

# Option 2: Via Services
# Press Win+R, type 'services.msc', find MongoDB, and start it
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Verify MongoDB is running:**
- Open MongoDB Compass
- Connect to `mongodb://127.0.0.1:27017`
- If successful, MongoDB is running ✅

### 5. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
# App will run on http://localhost:5173
```

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 👥 Default Users

After registration, you can create users with the following roles:

### Manager Account
- Role: Manager
- Can view all employee records and analytics

### Employee Account
- Role: Employee
- Can track personal attendance

## 📁 Project Structure

```
employee-attendance-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── attendanceController.js
│   │   └── managerController.js
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── managerOnly.js        # Role-based access
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Attendance.js         # Attendance schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── managerRoutes.js
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # API configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── HeroSection.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── EmployeeDashboard.jsx
│   │   │   └── ManagerDashboard.jsx
│   │   ├── store/
│   │   │   └── authStore.js      # Zustand store
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - User login
GET    /api/auth/me          - Get current user (requires auth)
```

### Attendance (Employee)
```
POST   /api/attendance/checkin     - Check in
POST   /api/attendance/checkout    - Check out
GET    /api/attendance/my-records  - Get personal records
```

### Manager
```
GET    /api/manager/all-attendance - Get all employee records
GET    /api/manager/analytics      - Get analytics data
```

## 🎨 Features in Detail

### Authentication System
- Secure user registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (Employee/Manager)

### Attendance Tracking
- One-click check-in/check-out
- Automatic timestamp recording
- Attendance history with filters
- Working hours calculation

### Manager Dashboard
- View all employee attendance
- Department-wise filtering
- Analytics and reports
- Employee productivity metrics

### Responsive Design
- Mobile-first approach
- Works seamlessly on all devices
- Modern UI with Tailwind CSS
- Smooth animations and transitions

## 🔒 Security Features

- 🔐 JWT authentication
- 🔑 Password hashing with bcrypt
- 🛡️ Protected routes
- 🚫 Role-based access control
- ✅ Input validation
- 🔒 Environment variables for sensitive data

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
net start MongoDB  # Windows (as Administrator)
brew services start mongodb-community  # Mac
sudo systemctl start mongod  # Linux
```

### Port Already in Use
```bash
# If port 5000 or 5173 is busy, change in:
# backend/.env -> PORT=5001
# Or kill the process using the port
```

### Registration Failed Error
- Ensure MongoDB is running
- Check that JWT_SECRET is set in .env
- Verify backend console for specific errors
- Check that email/employeeId is unique

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Create account on hosting platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Database (MongoDB Atlas)
1. Create free cluster
2. Get connection string
3. Update MONGO_URI in .env

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/attendance
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env) - Optional
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React Documentation
- Tailwind CSS
- MongoDB Documentation
- Express.js Community

BY SUHA MARIA
suhamaria2004@gmail.com

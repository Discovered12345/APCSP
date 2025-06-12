# 🖥️ APCSP Practice Hub

Welcome to the **AP Computer Science Principles Practice Hub** – a fully interactive website designed to help students master APCSP concepts through hands-on coding, quizzes, simulators, and cybersecurity challenges. Built with learners in mind, this platform combines engaging tools, visualizations, and real-world scenarios to make computer science accessible and fun.

![image](https://github.com/user-attachments/assets/a1fd7854-a18c-4836-892f-468ef473518b)


---

## 🎯 Purpose

This site supports APCSP students by offering:

- **Python coding practice** (inspired by CodingBat)
- **Cipher tools and quizzes** (Caesar & Vigenère)
- **Logic gate simulator** with truth table generator
- **Cybersecurity scenario quiz** and threat learning
- **RGB and HEX value practice**
- **Digital footprint and internet safety education**
- And much more to help prepare for the AP exam and real-world programming.

---

## 🚀 Features

### ✅ Python Practice
- Structured by APCSP units and topics
- Practice problems for variables, conditionals, loops, lists, procedures, and more
- Live editor + output view

### 🔐 Cipher Lab
- Switch between Caesar and Vigenère ciphers
- Encode, decode, and take timed quizzes on cipher logic

### 🔢 Logic Simulator
- Build and test logic circuits using AND, OR, NOT, NAND, NOR gates
- Auto-generates truth tables for combinations
- Helpful for Unit 3 Algorithm & Logic topics

### 🛡️ Cybersecurity Threat Quiz
- Interactive scenario-based quiz on:
  - Phishing
  - DDoS
  - Malware & Ransomware
  - Brute Force Attacks
  - Man-in-the-Middle (MITM)
  - DNS Spoofing
- Definitions, real-world examples, and defense strategies included

### 🌐 Digital Safety & Internet
- Learn how the internet works, including IP, DNS, and HTTP
- Understand your **digital footprint** and how to protect it

### 🎨 RGB/HEX Practice
- Convert between RGB and HEX color values
- Visual practice tool to understand digital color coding

---

## 🧱 Tech Stack

- **Frontend:** HTML, CSS, JavaScript, TailwindCSS (Andrew made)
- **Backend:** Neon (Paarth made)
- **Authentication:** Neon - Email sign up / login
- **Data Management:** Neon - same for authentication

---


<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">



# APCSP Practice Platform

A modern, production-grade AP Computer Science Principles study platform with secure authentication and full-stack architecture.

## 🏗️ Architecture

This application uses a **secure client-server architecture**:

- **Frontend**: React + TypeScript + Tailwind CSS (Vite)
- **Backend**: Node.js + Express + JWT Authentication
- **Database**: PostgreSQL via Neon (serverless)
- **Security**: JWT tokens, bcrypt password hashing, rate limiting, CORS

## 🔒 Security Features

- **No client-side database access** - all database operations happen on the server
- **JWT-based authentication** with 7-day expiration
- **Password hashing** with bcrypt (12 salt rounds)
- **Rate limiting** - 5 auth attempts, 100 API requests per 15 minutes
- **CORS protection** with environment-based configuration
- **Session storage** for tokens (more secure than localStorage)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- A Neon PostgreSQL database (free at [neon.tech](https://neon.tech))

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd apcsp-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment

Create a `.env` file in the root directory:

```env
# Required: Your Neon database connection string
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Required: A secure JWT secret (use a strong, random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Optional: Frontend URL for CORS (defaults to http://localhost:5173)
FRONTEND_URL=http://localhost:5173

# Optional: Server port (defaults to 3001)
PORT=3001
```

### 4. Set up the database

Run the migration to create the necessary tables:

```bash
npm run migrate
```

### 5. Start the application

You have several options:

**Option A: Start both frontend and backend together**
```bash
npm run dev:full
```

**Option B: Start them separately**
```bash
# Terminal 1: Start the backend server
npm run dev:server

# Terminal 2: Start the frontend
npm run dev
```

### 6. Access the application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📁 Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── contexts/          # React contexts (Auth)
│   ├── lib/               # Frontend utilities and API client
│   └── types/             # TypeScript type definitions
├── server/                # Backend Node.js server
│   └── index.js          # Express server with JWT auth
├── migrations/           # Database schema migrations
│   └── 001_initial_schema.sql
├── scripts/             # Utility scripts
│   └── migrate.js       # Database migration runner
└── package.json         # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:server` - Start backend server
- `npm run dev:full` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run migrate` - Run database migrations
- `npm run preview` - Preview production build

## 🗄️ Database Schema

The application creates a `users` table with the following structure:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    profile JSONB DEFAULT '{}',
    stats JSONB DEFAULT '{
        "totalQuestions": 0,
        "correctAnswers": 0,
        "streak": 0,
        "unitsCompleted": []
    }',
    progress JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login with email/password

### Users
- `GET /api/users/profile` - Get current user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `PUT /api/users/stats` - Update user statistics (protected)
- `PUT /api/users/progress` - Update user progress (protected)

### Health Check
- `GET /api/health` - Check API server status

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret key for JWT token signing |
| `FRONTEND_URL` | No | Frontend URL for CORS (defaults to localhost:5173) |
| `PORT` | No | Server port (defaults to 3001) |

## 🚀 Deployment

### Backend Deployment

1. Set up your production database (Neon recommended)
2. Configure environment variables on your hosting platform
3. Run migrations: `npm run migrate`
4. Start the server: `node server/index.js`

### Frontend Deployment

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Ensure your API URL is correctly configured

## 🧪 Development Notes

- The application uses sessionStorage for JWT tokens (more secure than localStorage)
- All database operations are performed server-side for security
- Password hashing uses bcrypt with 12 salt rounds
- Rate limiting is applied to prevent abuse
- CORS is configured to allow requests from the frontend URL

## 📚 Features

- **User Authentication**: Secure signup/login with JWT
- **Progress Tracking**: Save and sync study progress
- **Statistics**: Track performance and streaks
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### "Unable to connect to server" error

1. Make sure the backend server is running (`npm run dev:server`)
2. Check that your `.env` file is properly configured
3. Verify your database connection string is correct
4. Ensure the server port (default 3001) is not blocked

### Database connection issues

1. Verify your Neon database is active
2. Check that your `DATABASE_URL` includes the correct credentials
3. Make sure you've run the migrations (`npm run migrate`)
4. Test your connection string directly with a PostgreSQL client

### Authentication issues

1. Make sure your `JWT_SECRET` is set in `.env`
2. Clear your browser's session storage if you're having login issues
3. Check the browser console for any error messages


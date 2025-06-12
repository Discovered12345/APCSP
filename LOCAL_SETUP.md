# Running APCSP Practice Platform Locally

## Prerequisites

Make sure you have the following installed on your computer:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

## Setup Instructions

### 1. Clone or Download the Project
If you have the project files, navigate to the project directory in your terminal.

### 2. Install Dependencies
Open your terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all the required packages including React, Vite, Tailwind CSS, and other dependencies.

### 3. Set Up Environment Variables (Optional)
Create a `.env` file in the root directory if you want to use external services:

```bash
# Copy the example file
cp .env.example .env
```

Then edit the `.env` file with your API keys:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_NEON_DATABASE_URL=your_neon_database_url_here
```

**Note:** The app will work without these environment variables using localStorage for data persistence.

### 4. Start the Development Server
Run the following command to start the local development server:

```bash
npm run dev
```

### 5. Open in Browser
After running the command, you should see output similar to:
```
  VITE v5.4.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to `http://localhost:5173/` to view the application.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Features Available Locally

✅ **Working without backend:**
- Dashboard with progress tracking
- Interactive practice tools (RGB converter, cipher tools, etc.)
- Flashcards system
- Units practice with questions
- User authentication (stored in localStorage)
- Progress tracking
- Study history

✅ **All interactive tools:**
- RGB/HEX Color Converter
- Caesar & Vigenère Cipher Tools
- Binary Practice
- Logic Gate Simulator with truth tables
- Cybersecurity Threat Scenarios
- Python Resources

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.).

### Dependencies Issues
If you encounter dependency issues, try:
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Clear Browser Cache
If you see old content, try:
- Hard refresh: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache and cookies for localhost

## Development Notes

- The app uses **localStorage** for data persistence when no backend is configured
- User accounts and progress are saved locally in your browser
- All practice tools work offline
- The app is fully responsive and works on mobile devices

## Next Steps

To add a real backend with Neon:
1. Set up a Neon database
2. Add your connection string to `.env`
3. Implement the database integration in `src/lib/database.ts`
4. Update the AuthContext to use the real database instead of localStorage

Enjoy practicing for your AP Computer Science Principles exam! 🚀
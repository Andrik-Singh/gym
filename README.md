Gym - Next.js Fitness Tracker App

🚀 Overview
Gym is a modern, responsive web application built with Next.js for tracking fitness workouts, logging exercises, and visualizing progress. Whether you're a beginner or a seasoned athlete, Gym helps you stay motivated by providing an intuitive dashboard for routines, progress charts, and goal setting.
This project was bootstrapped with create-next-app and leverages the App Router for seamless server-side rendering and API routes. It includes features like user authentication, real-time updates, and data persistence with a lightweight backend.
Key Features

Workout Logging: Easily add exercises, sets, reps, and weights.
Progress Tracking: Visualize your gains with interactive charts (using Recharts).
Routine Builder: Create and schedule custom workout plans.
User Dashboard: Personalized stats, history, and goal reminders.
Mobile-Responsive: Optimized for all devices with Tailwind CSS.
Dark Mode Support: Toggle between light and dark themes.

🛠️ Tech Stack

Frontend: Next.js 14 (App Router), React 18, TypeScript
Styling: Tailwind CSS, Geist Font (via next/font)
Data Visualization: Recharts for charts and graphs
State Management: Zustand for lightweight global state
Backend: Next.js API Routes with Prisma ORM (SQLite for dev)
Deployment: Vercel (one-click deploy)
Other: ESLint, Prettier, Husky for code quality

📦 Prerequisites

Node.js (v18 or higher)
npm/yarn/pnpm/bun (package manager of choice)
Git

🚀 Quick Start
Installation

Clone the repository:
git clone https://github.com/Andrik-Singh/gym.git
cd gym


Install dependencies:
npm install
# or
yarn install
# or
pnpm install
# or
bun install


Set up environment variables (optional for dev):Copy .env.example to .env.local and add any required keys (e.g., for database or auth).

Run the development server:
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


Open http://localhost:3000 in your browser to view the app.


The page will auto-update as you edit files like app/page.tsx or components in app/components/.
Development Scripts



Script
Description



npm run dev
Start development server


npm run build
Build for production


npm run start
Run production server


npm run lint
Run ESLint


npm run format
Format code with Prettier


📁 Project Structure
gym/
├── app/                  # App Router pages and layouts
│   ├── api/              # API routes (e.g., /api/workouts)
│   ├── components/       # Reusable UI components
│   ├── page.tsx          # Home page
│   └── layout.tsx        # Root layout
├── public/               # Static assets (images, icons)
├── lib/                  # Utilities (e.g., database, auth)
├── prisma/               # Prisma schema and migrations
├── styles/               # Global CSS and Tailwind config
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies and scripts

🔧 Usage Examples
Logging a Workout

Navigate to the Dashboard (/dashboard).
Click "New Workout" and select an exercise (e.g., Bench Press).
Input sets/reps/weight and save. Data persists via API.

Example API call (from frontend):
// In a component
const logWorkout = async (data: WorkoutData) => {
  const res = await fetch('/api/workouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

Viewing Progress

Visit /progress to see charts of your lifts over time.
Filter by exercise or date range.

🧪 Testing

Unit tests: npm run test (using Jest + React Testing Library)
E2E tests: npm run test:e2e (using Playwright)

Add tests in __tests__/ or alongside components.
🌐 Deployment
Vercel (Recommended)

Push your code to GitHub.
Connect your repo to Vercel.
Deploy with one click—no config needed!

Check out the Next.js deployment docs for more.
Other Platforms

Netlify: Drag-and-drop the build folder.
Railway/Heroku: Use with a Postgres add-on for production DB.

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repo and create a feature branch (git checkout -b feature/amazing-feature).
Commit your changes (git commit -m 'Add amazing feature').
Push to the branch (git push origin feature/amazing-feature).
Open a Pull Request.

See CONTRIBUTING.md for detailed guidelines.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Built on top of Next.js by Vercel.
Icons from Heroicons.
Thanks to the open-source community for tools like Tailwind and Prisma.

📞 Contact

Author: Andrik Singh (@andrik_singh on X)
Issues: Open an issue


⭐ Star this repo if you find it useful! Let's build better fitness habits together. 💪

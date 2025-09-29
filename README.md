This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

<<<<<<< HEAD
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


<<<<<<< HEAD
⭐ Star this repo if you find it useful! Let's build better fitness habits together. 💪
=======
⭐ Star this repo if you find it useful! Let's build better fitness habits together. 💪
>>>>>>> 1729e810ac76c8cce5d742fca03bdc836fb1d84f
=======
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 6bf678262035335e56747d7cb9c3afd3910692e6

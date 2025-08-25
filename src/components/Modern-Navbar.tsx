"use client";

import { getAuth } from "@/lib/server/get";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import Logo from "./Logo";
import { Skeleton } from "./ui/skeleton";
import { AnimatedBackground } from "../../components/motion-primitives/animated-background";

interface Data {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
  };
}
const ModernNavbar = () => {
  const Tabs = ["Home", "Features", "About", ""];
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadAuth = async () => {
      try {
        setLoading(true);
        const data = await getAuth();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAuth();
  }, []);
  if (loading) {
    <Skeleton />;
  }
  return (
    <nav className="absolute top-0 w-full z-10 bg-transparent backdrop-blur-sm flex p-5 justify-between items-center shadow-sm">
      <div>
        <Logo />
      </div>
      <div className='flex flex-row gap-10'>
      <AnimatedBackground
        defaultValue={Tabs[0]}
        className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
        transition={{
          type: "inertia",
          bounce: 0.5,
          duration: 0.5,
        }}
        enableHover
      >
        {Tabs.map((tab, index) => (
          <button
            key={index}
            data-id={tab}
            type='button'
            className='px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50'
          >
            {tab}
          </button>
        ))}
      </AnimatedBackground>
    </div>
      <div>
        {data?.user ? (
          <div className="flex gap-4 items-center">
            <Button asChild>
              <Link href="/dashboard">Get started for free</Link>
            </Button>
          </div>
        ) : (
          <Button asChild variant="destructive">
            <Link href="/login">Sign up</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default ModernNavbar;

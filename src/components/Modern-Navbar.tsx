"use client";

import { getAuth } from "@/lib/server/get";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Logo from "./Logo";
import { Skeleton } from "./ui/skeleton";
import AnimatedTabs from "./forgeui/animated-tabs";

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
  const Tabs = ["Home", "Features", "About"];
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
    <nav className="w-full z-10 bg-transparent backdrop-blur-sm  flex p-5 justify-between items-center shadow-sm">
      <div className="text-white">
        <Logo />
      </div>
      <div className="flex flex-row gap-10">
        <AnimatedTabs tabs={Tabs} />
      </div>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {data?.user ? (
            <div className="flex gap-4 items-center">
              <Button 
              variant={"secondary"}
              asChild>
                <Link href="/dashboard">Get started for free</Link>
              </Button>
            </div>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/login">Sign up</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default ModernNavbar;

"use client";

import { getAuth } from "@/lib/server/get";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Logo from "./Logo";
import { Skeleton } from "./ui/skeleton";
import AnimatedTabs from "./forgeui/animated-tabs";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

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
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  console.log(scrollY);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });
  const Tabs = [
    {
      link: "#home",
      title: "Home",
    },
    {
      link: "#features",
      title: "Features",
    },
    {
      link: "#about",
      title: "About",
    },
    {
      link: "#testimonials",
      title: "Testimonials",
    },
  ];
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
    <motion.nav
      initial={"false"}
      transition={{ duration: 0.4 }}
      animate={{
        backgroundColor: scrolled ? "rgba(55,215,215,0.5)" : "rgba(0,0,0,0)",
        height: scrolled ? "70px" : "90px",
      }}
      className="w-full z-10 fixed backdrop-blur-sm  flex p-5 justify-between items-center shadow-sm"
    >
      <div className="text-white">
        <Logo />
      </div>
      <div className=" flex-row gap-10 hidden xl:flex">
        {Tabs.map((title) => (
          <Link
            href={title.link}
            className={
              " cursor-pointer transition-all" + scrolled
                ? "hover:text-gray-600"
                : "hover:text-blue-400"
            }
            key={title.title}
          >
            {title.title}
          </Link>
        ))}
      </div>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {data?.user ? (
            <div className="flex gap-4 items-center">
              <Button variant={"secondary"} asChild>
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
    </motion.nav>
  );
};

export default ModernNavbar;

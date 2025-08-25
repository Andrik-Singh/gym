"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import SignOutButton from "./SignOutButton";
import Logo from "./Logo";
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
const BasicNavbar = ({ data }: { data?: Data }) => {
  return (
    <div className="fixed top-0 w-full z-10 bg-background/80 backdrop-blur-sm flex p-5 justify-between items-center shadow-sm">
      <div>
        <Logo />
      </div>
      <nav>
        {data?.user ? (
          <div className="flex gap-4 items-center">
            <Button asChild>
              <Link href="/dashboard">Get started for free</Link>
            </Button>
            <SignOutButton />
          </div>
        ) : (
          <Button asChild variant="destructive">
            <Link href="/login">Sign up</Link>
          </Button>
        )}
      </nav>
    </div>
  );
};

export default BasicNavbar;

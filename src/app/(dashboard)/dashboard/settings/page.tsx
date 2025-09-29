import SignOutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAuth } from "@/lib/server/get";
import {
  CookingPot,
  Dumbbell,
  HandFist,
  HandPlatter,
  User2,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
export const metadata:Metadata={
  title:"Settings Page",
}
const items: {
  icon: typeof User2;
  url: string;
  title: string;
  description: string;
}[] = [
  {
    icon: Dumbbell,
    url: "/dashboard/settings/favourite-plans",
    title: "Favourite Plans",
    description:
      "Keep your go-to workout plans at your fingertips so you never lose momentum.",
  },
  {
    icon: CookingPot,
    url: "/dashboard/settings/favourite-meal",
    title: "Favourite Meals",
    description:
      "Save the meals you love and bring them back anytime to stay on track with your goals.",
  },
  {
    icon: HandFist,
    url: "/dashboard/settings/your-plan",
    title: "Your Plans",
    description:
      "Build, customize, and follow your personal workout journey—designed by you, for you.",
  },
  {
    icon: HandPlatter,
    url: "/dashboard/settings/your-meal",
    title: "Your Meals",
    description:
      "Create and manage meals that fuel your progress and match your lifestyle.",
  },
];
const page = async () => {
  const data = await getAuth();
  if (!data) notFound();
  const { user } = data;
  return (
    <section className="md:ml-20 ml-5 pt-5">
      <div className="flex justify-between px-10 items-center">
        <h1 className="font-semibold xl:text-3xl text-xl">
          Welcome back {user.name}
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>Sign Out</Button>
          </DialogTrigger>
          <DialogContent>
              <DialogTitle className="font-bold text-xl mb-5">Are you sure you want to logout?</DialogTitle>
            <DialogFooter>
              <SignOutButton></SignOutButton>
              <DialogClose>
                <Button>
                  No Keep signed in
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10 mt-5 px-5">
        {items.map((item, index) => (
          <Link key={index} href={item.url}>
            <Card className="cursor-pointer transition hover:shadow-xl hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center gap-3">
                <item.icon className="w-6 h-6 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default page;

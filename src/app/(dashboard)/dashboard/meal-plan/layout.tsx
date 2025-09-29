import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const layout = ({
  children,
  popular,
  yourMeal,
}: {
  children: React.ReactNode;
  popular: React.ReactNode;
  yourMeal: React.ReactNode;
}) => {
  return (
    <main className=" min-h-screen md:pl-[4rem] py-8 px-4 md:px-8">
      <section className="max-w-5xl mx-auto space-y-8">
        <div>{children}</div>
        <Separator className="my-6" />
        <div></div>
        <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
          Popular Meal Plans
        </h2>
        <div className="bg-amber-50 rounded-lg shadow p-6">{popular}</div>
        <Separator className="my-6" />
        <div className="">
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
            Your Meal Plan
          </h2>
          <div className="bg-amber-50 rounded-lg shadow p-6">{yourMeal}</div>
        </div>
      </section>
      <Button className="fixed bottom-10 right-10">
        <Link href={"/dashboard/create-meal-plan"}>Create a new meal plan</Link>
      </Button>
    </main>
  );
};

export default layout;

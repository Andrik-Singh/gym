import { Separator } from "@/components/ui/separator";
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
    <main className="bg-zinc-100 min-h-screen md:pl-[4rem] py-8 px-4 md:px-12">
      <section className="max-w-4xl mx-auto space-y-8">
      <div>{children}</div>
      <Separator className="my-6" />
      <div></div>
        <h2 className="text-xl font-semibold mb-4 text-zinc-800">Popular Meal Plans</h2>
        <div className="bg-white rounded-lg shadow p-6">{popular}</div>
      <Separator className="my-6" />
      <div>
        <h2 className="text-xl font-semibold mb-4 text-zinc-800">Your Meal Plan</h2>
        <div className="bg-white rounded-lg shadow p-6">{yourMeal}</div>
      </div>
      </section>
    </main>
  );
};

export default layout;

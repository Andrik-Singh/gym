"use client";
import { Sparkles, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
const Works = () => {
  const steps = [
    {
      icon: Target,
      number: "01",
      title: "Tell us your goals",
      description:
        "Share your fitness goals, current level, dietary preferences, and any restrictions to get started.",
    },
    {
      icon: Sparkles,
      number: "02",
      title: "Get your custom workout & meals",
      description:
        "Our AI generates personalized workout routines and meal plans tailored specifically for you.",
    },
    {
      icon: TrendingUp,
      number: "03",
      title: "Track and save your favorites",
      description:
        "Log your workouts, track progress, and save your favorite meals and plans for easy access.",
    },
  ];
  const conatiner = {
    initial: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.2,
      },
    },
  };
  const items = {
    initial: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };
  const heading = "How it works";
  const paragraph = "Get started in minutes with our simple three-step process";
  return (
    <div className="bg-zinc-200 text-black flex flex-col gap-10 items-center sm:p-10 py-10 px-0 h-auto">
      <div className="text-3xl">
        {heading.split("").map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.05 * i }}
            viewport={{ once: true }}
          >
            {c}
          </motion.span>
        ))}
      </div>
      <div className="text-2xl text-center">
        {paragraph.split("").map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.02 * i }}
            viewport={{ once: true }}
          >
            {c}
          </motion.span>
        ))}
      </div>
      <motion.div
        variants={conatiner}
        initial={"initial"}
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="flex md:flex-row flex-col gap-5 items-center-safe justify-around w-screen"
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={items}
            className="bg-white rounded-2xl  p-6 flex flex-col items-center text-center max-w-sm
            hover:scale-105 hover:shadow-lg shadow-gray-300 border-gray-200 transition-all duration-300
            "
          >
            <step.icon className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Works;

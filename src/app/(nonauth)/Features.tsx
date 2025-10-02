"use client";
import EmptyMealCard from "@/components/Empty-Meal-Card";
import EmptyPlanCard from "@/components/Empty-Plan-Card";
import EmptyWorkoutLog from "@/components/EmptyWorkoutLogs";
import { AnimatePresence, motion } from "motion/react";
const Features = () => {
  const conatiner = {
    initial: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
  return (
    <AnimatePresence>
      <motion.section
        id="features"
        variants={conatiner}
        initial="initial"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="flex xl:flex-row flex-col gap-5 w-screen h-auto bg-transparent my-16 z-10"
      >
        <motion.div
          variants={items}
        >
          <EmptyMealCard></EmptyMealCard>
        </motion.div>
        <motion.div
          variants={items}
        >
          <EmptyPlanCard></EmptyPlanCard>
        </motion.div>
        <motion.div
          variants={items}
        >
          <EmptyWorkoutLog></EmptyWorkoutLog>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Features;

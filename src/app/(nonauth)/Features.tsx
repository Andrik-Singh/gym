"use client";
import EmptyMealCard from "@/components/Empty-Meal-Card";
import EmptyPlanCard from "@/components/Empty-Plan-Card";
import EmptyWorkoutLog from "@/components/EmptyWorkoutLogs";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024); 
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isDesktop;
};

const Features = () => {
  const isDesktop = useIsDesktop();

  const desktopContainer = {
    initial: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="features"
      className="flex xl:flex-row flex-col gap-5 w-screen h-auto bg-transparent my-16 z-10"
    >
      {isDesktop ? (
        <motion.div
          className="flex gap-5 w-full"
          variants={desktopContainer}
          initial="initial"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={cardVariants}>
            <EmptyMealCard />
          </motion.div>
          <motion.div variants={cardVariants}>
            <EmptyPlanCard />
          </motion.div>
          <motion.div variants={cardVariants}>
            <EmptyWorkoutLog />
          </motion.div>
        </motion.div>
      ) : (

        <>
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <EmptyMealCard />
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <EmptyPlanCard />
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <EmptyWorkoutLog />
          </motion.div>
        </>
      )}
    </section>
  );
};

export default Features;

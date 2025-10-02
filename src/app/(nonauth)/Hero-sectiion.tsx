"use client";
import { ArrowRight } from "lucide-react";
import {   motion } from "motion/react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <motion.div>
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 50 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative bg-[url('https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-black/40 bg-blend-multiply bg-no-repeat bg-cover min-h-screen mb-10"
      >
        <div
          className="
        flex flex-col gap-7 items-center leading-relaxed md:w-auto w-full sm:px-10 px-0
        absolute z-10 text-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4"
        >
          <motion.span
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="xl:text-5xl text-3xl text-center"
          >
            Your AI Powered Fitness Coach
          </motion.span>
          <motion.span
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-xl text-center"
          >
            Generate personalized workout and meal plans, track your progress,
            and save your favorites all in one place.
          </motion.span>
          <motion.button
            initial={{ scale: 0, x: -90 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="group bg-gradient-to-r hover:bg-none from-blue-500 to-teal-300 text-xl shadow-sm shadow-blue-500 pl-5 pr-5 py-2 rounded-xl"
          >
            <Link
              href={"/dashboard"}
              className="
                group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-green-200 
                 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300
                flex items-center gap-3 group-hover:translate-x-3 group-hover:mr-3"
            >
              <span>Get Started for free</span>
              <ArrowRight></ArrowRight>
            </Link>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{duration:0.5,delay:0.6}}
            className="flex md:flex-row flex-col items-center gap-5"
          >
            <div className="flex items-center gap-3 ">
              <div className="bg-green-200 rounded-full min-w-9 min-h-9 grid place-items-center">
                <div className="bg-green-600 rounded-full w-3 h-3"></div>
              </div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-3 ">
              <div className="bg-blue-200 rounded-full min-w-9 min-h-9 grid place-items-center">
                <div className="bg-blue-600 rounded-full w-3 h-3"></div>
              </div>
              <span>See popular workout plans</span>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Hero;

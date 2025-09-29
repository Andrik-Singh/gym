import React from "react";

import { ArrowRight, DumbbellIcon, Sparkles } from "lucide-react";
import Link from "next/link";
const EmptyPlanCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 flex items-center justify-center dark:from-emerald-900 dark:to-teal-800">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-100 rounded-full blur-2xl opacity-50 -ml-12 -mb-12"></div>
          <div className="relative mb-6 inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center transform rotate-6 transition-transform hover:rotate-12 duration-300">
              <DumbbellIcon className="w-10 h-10 text-emerald-600 -rotate-6" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your Workout Plan Awaits
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Start building your personalized workout plans. Save your favorite
            workout plans and save the workout logs.
          </p>
          <Link href={"/dashboard/create-meal-plan"} className="group w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            <span>Add Your First Workout Plan</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 font-semibold text-sm">
                  💡
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Quick Tip
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Add workouts you love to quickly generate weekly workout plans
                  tailored to your fitness goals.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-2">💪</div>
            <p className="text-xs text-gray-600 font-medium">Workout Plans</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-2">📅</div>
            <p className="text-xs text-gray-600 font-medium">Plan Ahead</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-2">❤️</div>
            <p className="text-xs text-gray-600 font-medium">Save Favorites</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyPlanCard;

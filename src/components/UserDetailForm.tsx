"use client";
import { userDetailSchema, UserDetailType } from "@/lib/zod/UserDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { saveUserDetail } from "@/lib/server/userDetails/post";
import { Loader } from "lucide-react";

const UserDetailForm = () => {
  const {
    register,
    formState: { errors ,isSubmitting},
    handleSubmit,
  } = useForm({
    resolver: zodResolver(userDetailSchema),
    defaultValues:{
      weight:50,
      height:100,
      steps:5000,
    }
  });
  const onSubmit:SubmitHandler<UserDetailType> = async (data) => {
    const res=await saveUserDetail(data)
    if(res.error){
      console.log(res.error)
    }
  };
  return (
    <section className="flex justify-center items-center min-h-screen rounded-md bg-gradient-to-br from-zinc-200 to-blue-400 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Enter your personal details <br />
          <span className="text-blue-600 text-lg">
            {new Date().toDateString()}
          </span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g. 70"
              className="mt-2 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              {...register("weight")}
            />
            {errors.weight && (
              <p className="mt-1 text-sm text-red-500">
                {errors.weight?.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g. 175"
              className="mt-2 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              {...register("height")}
            />
            {errors.height && (
              <p className="mt-1 text-sm text-red-500">
                {errors.height?.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="steps"
              className="block text-sm font-medium text-gray-700"
            >
              Steps (today)
            </Label>
            <Input
              id="steps"
              type="number"
              placeholder="e.g. 5000"
              className="mt-2 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              {...register("steps")}
            />
            {errors.steps && (
              <p className="mt-1 text-sm text-red-500">
                {errors.steps?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            {isSubmitting ? 
              <div className="flex items-center justify-center">
                <Loader className="animate-spin"></Loader>
                Saving
              </div>:
              "Save Plan"  
          }
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserDetailForm;

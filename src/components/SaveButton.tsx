"use client";
import { Heart } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { mealPlan } from "@/db/schema";
import { toggleEffect } from "@/lib/server/mealPlans/post";
import { toggleFavouritePlans } from "@/lib/server/plans/post";

const SaveButton = ({id,hasLiked,meal}:{id:string,hasLiked:boolean,meal:boolean}) => {
  const [Liked, setLiked] = useState<boolean>(hasLiked);
  const [isSaving, setIsSaving] = useTransition();
  return (
    <Button
      variant="secondary"
      size="sm"
      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
      onClick={() => {
        setIsSaving(async () => {
          if(meal){
            console.log("meal")
            toggleEffect(id, Liked);
          }else{
            console.log("plans")
            toggleFavouritePlans(id,Liked)
          }
          setLiked(!Liked);
        });
      }}
    >
      <Heart
        className={"w-4 h-4 mr-2" + Liked ? "text-red-700" : "text-black"}
        color={Liked ? "red" : "black"}
      />
      {isSaving ? "Saving" : Liked ? "Saved" : "Save"}
    </Button>
  );
};

export default SaveButton;

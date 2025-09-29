"use client";
import { deletePlans } from "@/lib/server/plans/delete";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMealPlans } from "@/lib/server/mealPlans/post";
const DeleteButton = ({id,meal}:{id:string,meal:boolean}) => {
  const router=useRouter()
  const [isDeleting,startTransition]= useTransition()
  const [success, setSuccess] = useState<boolean>(false)
  return (
    <Button
      disabled={isDeleting}
      onClick={() => {
        startTransition(async()=>{
            if(meal){
              const { success } =await deleteMealPlans(id)
              setSuccess(success)
            }
            else{
              const { success }=await deletePlans(id)
              setSuccess(success)
            }
            if(success){
                router.push("/dashboard")              
            }else{
                
            }
        })
      }}
      variant={"destructive"}
    >
      <Trash />
      Delete
    </Button>
  );
};

export default DeleteButton;

"use client";
import { deletePlans } from "@/lib/server/plans/delete";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
const DeleteButton = ({id}:{id:string}) => {
  const router=useRouter()
  const [isDeleting,startTransition]= useTransition()
  return (
    <Button
      disabled={isDeleting}
      onClick={() => {
        startTransition(async()=>{
            const { success,error }=await deletePlans(id)
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

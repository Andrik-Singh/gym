import { getMealByUser } from "@/lib/server/mealPlans/get";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const page = async () => {
  const res = await getMealByUser();
  if (!res) redirect("/login");
  console.log(res);
  return (
    <div>
      {res?.data?.length == 0 && (
        <>
          <div>no meal found</div>
          <Link href={"/dashboard/create-meal-plan"}>
            Create a new one
          </Link>
        </>
      )}
      {res?.data?.map((meal,index)=>(
         <div key={index}>

         </div>
      ))}
    </div>
  );
};

export default page;

import { db } from "@/db";
import { workoutExercises, workOutLogs } from "@/db/schema";
import { eq, lt, not } from "drizzle-orm";
import { cutOffDate, getAuth } from "@/lib/server/get";
import { redirect } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/card";
import LogCards from "@/components/LogCards";

const page = async () => {
  const authData = await getAuth();
  const date = await cutOffDate(30);
  if (!authData) redirect("/login");
  const res = await db
    .select()
    .from(workOutLogs)
    .innerJoin(
      workoutExercises,
      eq(workoutExercises.exerciseId, workOutLogs.exerciseId)
    )
    .where(not(lt(workOutLogs.date, new Date(date))));
  
  return (
    <div className="">
      <LogCards res={res}/>
    </div>
  );
};

export default page;

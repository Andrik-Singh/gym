import { db } from "@/db";
import { workoutExercises, workOutLogs } from "@/db/schema";
import { and, eq, lt, not } from "drizzle-orm";
import { cutOffDate, getAuth } from "@/lib/server/get";
import { redirect } from "next/navigation";
import LogCards from "@/components/LogCards";
import { Metadata } from "next";
import EmptyWorkoutLog from "@/components/EmptyWorkoutLogs";
export const metadata:Metadata={
  title:"Workout-logs",

}
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
    .where(and(
      eq(workOutLogs.userId,authData.user.id),
      not(lt(workOutLogs.date, new Date(date)))
    ));
  if(res.length === 0){
    return (
      <EmptyWorkoutLog/>
    )
  }
  return (
    <div className="">
      <LogCards res={res}/>
    </div>
  );
};

export default page;

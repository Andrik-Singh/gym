import DeleteButton from "@/components/DeleteButton";
import SaveButton from "@/components/SaveButton";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WorkoutCard from "@/components/WorkoutCard";
import { getExercises } from "@/lib/server/exercises/get";
import { getAuth } from "@/lib/server/get";
import getPlans, { getFavourite } from "@/lib/server/plans/get";
import { DialogDescription } from "@radix-ui/react-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import { notFound } from "next/navigation";
export interface Exercise {
  exerciseId: string;
  exerciseName: string;
  reps: string;
  rest: string;
  sets: number;
  planId?: string;
  workDay?: number;
  nutrition: string;
  progression: string;
  safety: string;
  showPublic: boolean | null;
}
export interface Day {
  workDay: number;
  planId: string;
  exercises: Exercise[];
}
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const plan = (await getPlans(id)).data;
  console.log(plan);
  const exercise = (await getExercises(id)) as Day[];
  const res = await getFavourite(plan[0].planId);
  console.log(res);
  const authData = await getAuth();
  if(!authData) notFound()
  const { user } = authData;
  const hasLiked = res.data?.length === 0 ? false : true;
  return (
    <>
      <header className="md:mx-20 mx-5 relative overflow-hidden rounded-2xl bg-gradient-to-br mt-5 from-emerald-500 via-emerald-600 to-teal-700 p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="font-bold text-3xl md:text-4xl">{plan[0].planName}</h1>
          <div className="flex space-x-3 mt-3 sm:mt-0">
            <SaveButton id={plan[0].planId} hasLiked={hasLiked} meal={false} />
            <ShareButton />
          </div>
        </div>

        <p className="text-sm md:text-base opacity-90">{plan[0].description}</p>

        <div className="flex flex-wrap gap-3 mt-4">
          <span className="flex bg-white/20 px-5 py-5 w-auto min-h-auto rounded-xl text-sm font-medium">
            🥗 Nutrition: {plan[0].nutrition}
          </span>
          <span className="flex items-center bg-white/20 p-5 rounded-xl text-sm font-medium">
            ⚠️ Safety: {plan[0].safety}
          </span>
          <span className="flex items-center bg-white/20 p-5 rounded-xl text-sm font-medium">
            📈 Progression: {plan[0].progression}
          </span>
          <span className="flex items-center bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
            📅 Days: {plan[0].numberOfDays}
          </span>
        </div>
      </header>

      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-7xl">
          {Object.values(exercise).map((day: Day, index: number) => (
            <WorkoutCard key={index} index={index} dayPlan={day}></WorkoutCard>
          ))}
        </div>
        {user.id === plan[0].userId && (
          <div className="fixed bottom-10 right-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Delete Workout Plan
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 mt-2">
                    Are you sure you want to delete &quot;
                    {plan[0]?.planName || "this workout plan"}&quot;? This
                    action cannot be undone and will permanently remove all
                    exercises and progress data.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-3 mt-6">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DeleteButton id={id} meal={false} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </>
  );
};

export default page;

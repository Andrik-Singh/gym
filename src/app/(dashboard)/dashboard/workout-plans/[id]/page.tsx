import DeleteButton from "@/components/DeleteButton";
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
import getPlans from "@/lib/server/plans/get";
import { DialogDescription } from "@radix-ui/react-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
export interface Exercise {
  exerciseId: string;
  exerciseName: string;
  reps: string;
  rest: string;
  sets: number;
  planId?: string;
  workDay?: number;
}
export interface Day {
  workDay: number;
  planId: string;
  exercises: Exercise[];
}
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const plan = (await getPlans(id)).data;
  const exercise = (await getExercises(plan[0].planId)) as Day[];
  return (
    <div className="flex justify-center items-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-7xl">
        {Object.values(exercise).map((day: Day, index: number) => (
          <WorkoutCard key={index} index={index} dayPlan={day}></WorkoutCard>
        ))}
      </div>
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
                {plan[0]?.planName || "this workout plan"}&quot;? This action
                cannot be undone and will permanently remove all exercises and
                progress data.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-6">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DeleteButton id={id} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default page;

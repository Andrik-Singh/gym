"use client"
import {
  Calendar,
  Dumbbell,
  Badge,
  ChevronRight,
  Clock,
  Target,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Link from "next/link";
import { storeSessionStorage } from "@/lib/storage";

interface DayPlan {
  workDay?: number;
  planId?: string;
  day?: string;
  exercises: {
    exerciseName?: string;
    name?: string;
    rest: string | null;
    sets: number | null;
    reps: string | null;
  }[];
}

const WorkoutCard = ({
  dayPlan,
  index,
}: {
  dayPlan: DayPlan;
  index: number;
}) => {
  return (
    <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm hover:from-emerald-50/80 hover:to-white/80">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-emerald-700 transition-colors">
                {`Day ${index + 1}`}
              </CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Dumbbell className="h-3 w-3" />
                <span>{dayPlan.exercises.length} exercises</span>
              </div>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            Day {index + 1}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {dayPlan.exercises.slice(0, 4).map((exercise, exerciseIndex) => (
            <div
              key={exerciseIndex}
              className="flex items-center gap-2 p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
              <span className="text-sm font-medium text-foreground truncate flex-1">
                {exercise.name ?? exercise.exerciseName}
              </span>
              {exercise.sets && exercise.reps && (
                <Badge className="text-xs px-2 py-0.5">
                  {exercise.sets}×{exercise.reps}
                </Badge>
              )}
            </div>
          ))}

          {dayPlan.exercises.length > 4 && (
            <div className="text-xs text-muted-foreground text-center py-1">
              +{dayPlan.exercises.length - 4} more exercises
            </div>
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="pt-2 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300 bg-transparent"
              >
                <span>See full workout</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              {`Day ${index + 1} Workout`}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mb-6">
              Complete your {dayPlan.exercises.length} exercises for
              today&apos;s training session
            </DialogDescription>

            <div className="space-y-4">
              {dayPlan?.exercises.map((exercise, exerciseIndex) => (
                <div
                  key={exerciseIndex}
                  className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Dumbbell className="h-4 w-4 text-emerald-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-foreground">
                          {exercise?.name ?? exercise?.exerciseName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {exercise.sets && exercise.reps && (
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            <span className="font-medium">
                              {exercise.sets} sets × {exercise.reps} reps
                            </span>
                          </div>
                        )}
                        {exercise.rest && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">
                              Rest: {exercise.rest}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 ml-4">
                      Exercise {exerciseIndex + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          {dayPlan.planId && (
            <DialogFooter>
              <Button 
              onClick={()=>{
                storeSessionStorage("currentPlan",JSON.stringify(dayPlan))
              }}
              variant="outline">
                <Link
                  href={`/dashboard/workout-plans/${dayPlan.planId}/${dayPlan.workDay}`}
                >
                  Start Workout
                </Link>
              </Button>
            </DialogFooter>
          )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;

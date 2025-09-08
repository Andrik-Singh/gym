"use client"
import type { Day } from "@/app/(dashboard)/dashboard/workout-plans/[id]/page"
import { getExercises } from "@/lib/server/exercises/get"
import { getSessionStorage, storeSessionStorage } from "@/lib/storage"
import { useEffect, useState, useCallback } from "react"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Timer, Dumbbell, Play, RotateCcw, Trophy, Target, Clock } from "lucide-react"
import { Input } from "./ui/input"
import { logExercise } from "@/lib/server/exercises/post"

const WorkoutExercises = ({
  id,
  dayNumber,
}: {
  id: string
  dayNumber: string
}) => {
  const response: Day = JSON.parse(getSessionStorage("currentPlan") || "{}") as Day
  const [data, setData] = useState<Day>(response)
  const [currentExercise, setCurrentExercise] = useState<number>(0)
  const [currentSet, setCurrentSet] = useState<number>(1)
  const [completed, setCompleted] = useState<boolean>(false)
  const [isResting, setIsResting] = useState<boolean>(false)
  const [restTimeRemaining, setRestTimeRemaining] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [weightLifted, setWeightLifted] = useState<number | "">("")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = (await getExercises(id)) as Day
        console.log("fetched exercises:", response)
        setData(response)
        storeSessionStorage("currentPlan", response)
      } catch (error) {
        console.error("Error fetching exercises:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!data || Object.keys(data).length === 0) {
      fetchData()
    }
  }, [id, data])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isResting && restTimeRemaining > 0) {
      interval = setInterval(() => {
        setRestTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsResting(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isResting, restTimeRemaining])

  const handleNextSet = useCallback(async () => {
    console.log(typeof weightLifted)
    
    // Ensure weightLifted is a number before logging
    const weight = weightLifted === "" ? 0 : weightLifted as number;
    
    const logResponse = await logExercise({
      exerciseId: data.exercises[currentExercise].exerciseId,
      weight: weight,
      sets: currentSet,
      reps: data.exercises[currentExercise].reps || ""
    })
    console.log(logResponse)
    
    const currentExerciseData = data.exercises[currentExercise]

    if (currentSet < currentExerciseData.sets) {
      setCurrentSet(currentSet + 1)
      if (currentSet < currentExerciseData.sets) {
        const restSeconds = Number(currentExerciseData.rest) || 60
        setRestTimeRemaining(restSeconds)
        setIsResting(true)
      }
    } else {
      setCurrentSet(1)
      if (currentExercise < data.exercises.length - 1) {
        setRestTimeRemaining(3 * 60)
        setIsResting(true)
        setCurrentExercise(currentExercise + 1)
      } else {
        setCompleted(true)
      }
    }
  }, [data.exercises, currentExercise, currentSet, weightLifted])

  const calculateProgress = (): number => {
    if (!data.exercises || data.exercises.length === 0) return 0

    const totalSets = data.exercises.reduce((acc, exercise) => acc + exercise.sets, 0)
    const completedSets =
      data.exercises.slice(0, currentExercise).reduce((acc, exercise) => acc + exercise.sets, 0) + (currentSet - 1)

    return (completedSets / totalSets) * 100
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          <Dumbbell className="w-6 h-6 text-emerald-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-lg font-medium text-emerald-700 mt-4">Loading your workout...</div>
        <div className="text-sm text-emerald-600 mt-1">Preparing your exercises</div>
      </div>
    )
  }

  if (!data.exercises || data.exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Dumbbell className="w-8 h-8 text-gray-400" />
        </div>
        <div className="text-lg font-medium text-gray-700">No exercises found</div>
        <div className="text-sm text-gray-500 mt-1">This workout doesn&apos;t have any exercises yet.</div>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardHeader className="text-center pb-4">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs">🎉</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-800">Workout Complete!</CardTitle>
            <p className="text-emerald-600 mt-2">Outstanding work! You&apos;ve crushed every exercise.</p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-emerald-700">{data.exercises.length}</div>
                <div className="text-xs text-emerald-600">Exercises</div>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-emerald-700">
                  {data.exercises.reduce((acc, ex) => acc + ex.sets, 0)}
                </div>
                <div className="text-xs text-emerald-600">Total Sets</div>
              </div>
            </div>
            <Button
              onClick={() => {
                setCurrentExercise(0)
                setCurrentSet(1)
                setCompleted(false)
                setIsResting(false)
                setWeightLifted("")
              }}
              variant="outline"
              className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentExerciseData = data.exercises[currentExercise]

  if (isResting) {
    const restProgress =
      (((Number(currentExerciseData.rest) || 60) - restTimeRemaining) / (Number(currentExerciseData.rest) || 60)) * 100

    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center pb-4">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-blue-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - restProgress / 100)}`}
                  className="text-blue-500 transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Timer className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <CardTitle className="text-xl text-blue-800">Rest Time</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {Math.floor(restTimeRemaining / 60)}:{(restTimeRemaining % 60).toString().padStart(2, "0")}
            </div>
            <p className="text-blue-700 font-medium">
              Get ready for set {currentSet} of {currentExerciseData.exerciseName}
            </p>
            <Button
              onClick={() => {
                setIsResting(false)
                setRestTimeRemaining(0)
              }}
              variant="outline"
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Play className="w-4 h-4 mr-2" />
              Skip Rest
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div className="flex justify-between items-center text-sm text-emerald-700 mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="font-medium">
              Exercise {currentExercise + 1} of {data.exercises.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-bold">{Math.round(calculateProgress())}% Complete</span>
          </div>
        </div>
        <Progress value={calculateProgress()} className="h-3 bg-emerald-100" />
        <div className="text-xs text-emerald-600 mt-2 text-center">
          {data.exercises.length - currentExercise - 1} exercises remaining
        </div>
      </div>

      <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-emerald-200 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">{currentExerciseData.exerciseName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <div className="text-4xl font-bold text-emerald-700 mb-2">
              Set {currentSet} of {currentExerciseData.sets}
            </div>
            {currentExerciseData.reps && (
              <div className="text-emerald-600 font-medium">Target: {currentExerciseData.reps} reps</div>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Weight Used (kg)</label>
            <Input
              type="number"
              placeholder="Enter weight..."
              value={weightLifted}
              onChange={(e) => setWeightLifted(e.target.value ? Number(e.target.value) : "")}
              className="text-center text-lg font-semibold border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
            />
            <div className="flex gap-2 flex-wrap">
              {[2.5, 5, 7.5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 120, 150].map((weight) => (
                <Button
                  key={weight}
                  variant="outline"
                  size="sm"
                  onClick={() => setWeightLifted(weight)}
                  className="text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  {weight}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleNextSet}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 text-lg shadow-md"
            disabled={!weightLifted}
          >
            {currentSet < currentExerciseData.sets
              ? `Complete Set ${currentSet}`
              : currentExercise < data.exercises.length - 1
                ? "Next Exercise"
                : "Finish Workout"}
          </Button>

          {currentExerciseData.rest && (
            <div className="text-center bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="text-sm text-blue-700">
                <Timer className="w-4 h-4 inline mr-1" />
                Rest time: {Number(currentExerciseData.rest) || 60} seconds after this set
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default WorkoutExercises
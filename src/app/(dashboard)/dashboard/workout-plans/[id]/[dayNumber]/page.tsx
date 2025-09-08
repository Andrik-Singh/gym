import WorkoutExercises from "@/components/WorkoutExercises"
const page =async ({params}:{params:Promise<{
    id:string
    dayNumber:string
}>}) => {
  const {id,dayNumber}=await params

  return (
    <div className="flex justify-center items-center ">
       <WorkoutExercises id={id} dayNumber={dayNumber}/> 
    </div>
  )
}

export default page
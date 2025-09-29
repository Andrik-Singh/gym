
import ProgressBar from "@/components/ProgressBar"
import UserDetailForm from "@/components/UserDetailForm"

const page = () => {
  return (
    <div className="md:pl-20 px-5 flex flex-col gap-5 w-full h-full">
      <h1 className="text-3xl font-semibold">See your progress</h1>
      <section className="flex p-5 xl:flex-row flex-col bg-white flex-1 gap-5">
        <aside className="flex-1">
          <ProgressBar/>
        </aside>
        <section className="flex-1 flex flex-col gap-5">
          <UserDetailForm/>
        </section>
      </section>
    </div>
  )
}

export default page
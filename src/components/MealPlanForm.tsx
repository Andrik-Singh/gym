"use client"

import { FormProvider, useForm } from "react-hook-form"

const MealPlanForm = () => {
  const controls =useForm()
  const onsubmit=async(unsafeData){

  }
  return (
    <FormProvider {...controls}>
      <form onSubmit={controls.handleSubmit(onsubmit)}>

      </form>
    </FormProvider>
  )
}

export default MealPlanForm
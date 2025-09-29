import DeleteButton from "@/components/DeleteButton";
import MealPlanDisplay from "@/components/MealPlanCard";
import { Button } from "@/components/ui/button";
import { getAuth } from "@/lib/server/get";
import { checkLike, getAllMeals, getAllPublicMeals } from "@/lib/server/mealPlans/get";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await getAllPublicMeals(id);
  const meals = (await getAllMeals(id)).data;
  const likedRes=await checkLike(id)
  const authData=await getAuth()
  const liked = likedRes.data?.length === 0 ? false : true
  if (!res || !res.data || !meals || !authData) notFound();
  const { user } =authData
  const data = res.data[0];
  const newMeals: {
    meals: {
      MealTime: string;
      ingredients: string[];
      instructions: string;
      macronutrients: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
      };
      mealName: string;
      videoUrl: string | null;
    }[];
  } = {
    meals: [],
  };
  meals[0].forEach((meal) => {
    newMeals.meals.push({
      MealTime: meal.mealPlanTime,
      ingredients: meal.ingredients,
      instructions: meal.instructions,
      macronutrients: {
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
      },
      mealName: meal.mealName,
      videoUrl: null,
    });
  });
  const newPlans = {
    ...data,
    createdAt:
      data.createdAt instanceof Date
        ? data.createdAt.toISOString()
        : data.createdAt,
    mealPlanType: data.mealPlanTypes,
    showPublic: data.showPublic ?? false,
    ...newMeals,
  };
  return (
    <>
      <MealPlanDisplay mealPlan={newPlans} hasLiked={liked}></MealPlanDisplay>
      {newPlans.userId === user.id as string &&
        <DeleteButton id={newPlans.mealPlanId} meal/>
      }
    </>
  );
};

export default page;

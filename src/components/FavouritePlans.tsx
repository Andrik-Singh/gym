
import { favoutiteMeals, getMealByUser } from "@/lib/server/mealPlans/get";
import getPlans, { getFavouritePlans } from "@/lib/server/plans/get";
const FavouritePlans = async ({ slug }: { slug: string }) => {
  console.log(slug)
  const res =
    slug === "favourite-meal"
      ? await favoutiteMeals()
      : slug === "your-plan"
      ? await getPlans()
      : slug === "your-meal"
      ? await getMealByUser()
      : slug === "favourite-plans"
      ? await getFavouritePlans()
      : { data:[] };
  console.log(res);
  if(!res?.data || res.data.length == 0 || !res){
    return(
      <div>
        No meals found
      </div>
    )
  }
  const { data } =res
  if(slug === "favourite-meal" || slug ==="your-meal"){
    return(
      <div>
        {data.map((data)=>(
          <div key={data.mealPlanId || data.mealPlan.mealPlanId}></div>
        ))}
      </div>
    )
  }
 
};

export default FavouritePlans;

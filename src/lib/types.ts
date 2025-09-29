export type MealPlanType={
    mealPlanId: string;
    userId: string;
    createdAt: Date;
    showPublic: boolean | null;
    description: string;
    mealPlanName: string;
    numberOfMealsInADay: number;
    tags: ("weight_loss" | "strength_gain" | "muscle_building" | "endurance" | "flexibility")[];
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
    totalCalories: number;
    mealPlanTypes: string;
}
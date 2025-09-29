CREATE TYPE "public"."mealPlanTagsEnum" AS ENUM('weight_loss', 'strength_gain', 'muscle_building', 'endurance', 'flexibility');--> statement-breakpoint
CREATE TYPE "public"."mealPlanTypeEnum" AS ENUM('vegan', 'vegetarian', 'non_vegetarian', 'keto', 'paleo', 'mediterranean', 'low_carb', 'high_protein');--> statement-breakpoint
CREATE TABLE "mealPlanType" (
	"mealPlanId" text NOT NULL,
	"mealPlanType" "mealPlanTypeEnum" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meal" ALTER COLUMN "mealPlanId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meal" ADD COLUMN "mealPlanTime" text NOT NULL;--> statement-breakpoint
ALTER TABLE "meal" ADD COLUMN "instructions" text NOT NULL;--> statement-breakpoint
ALTER TABLE "meal" ADD COLUMN "ingredients" text[] DEFAULT ARRAY[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "mealPlanName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "numberOfMealsInADay" integer DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "tags" "mealPlanTagsEnum"[] DEFAULT ARRAY[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "totalProtein" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "totalCarbs" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "totalFats" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "totalCalories" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "mealPlanType" ADD CONSTRAINT "mealPlanType_mealPlanId_mealPlan_mealId_fk" FOREIGN KEY ("mealPlanId") REFERENCES "public"."mealPlan"("mealId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favouriteMealPlans" DROP COLUMN "id";
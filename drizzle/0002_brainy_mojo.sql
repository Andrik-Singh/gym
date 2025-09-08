CREATE TABLE "meal" (
	"mealId" text PRIMARY KEY NOT NULL,
	"mealPlanId" text,
	"mealName" text NOT NULL,
	"calories" integer NOT NULL,
	"protein" integer NOT NULL,
	"carbs" integer NOT NULL,
	"fats" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workOutLogs" DROP CONSTRAINT "workOutLogs_exerciseId_workoutExercises_exerciseId_fk";
--> statement-breakpoint
ALTER TABLE "workoutExercises" DROP CONSTRAINT "workoutExercises_planId_workoutPlans_planId_fk";
--> statement-breakpoint
ALTER TABLE "workOutLogs" ALTER COLUMN "reps" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workoutExercises" ALTER COLUMN "workDay" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "workoutExercises" ALTER COLUMN "sets" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutExercises" ALTER COLUMN "reps" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutExercises" ALTER COLUMN "rest" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workOutLogs" ADD COLUMN "logId" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "workOutLogs" ADD COLUMN "weight" integer;--> statement-breakpoint
ALTER TABLE "meal" ADD CONSTRAINT "meal_mealPlanId_mealPlan_mealId_fk" FOREIGN KEY ("mealPlanId") REFERENCES "public"."mealPlan"("mealId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workOutLogs" ADD CONSTRAINT "workOutLogs_exerciseId_workoutExercises_exerciseId_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."workoutExercises"("exerciseId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "workoutExercises" ADD CONSTRAINT "workoutExercises_planId_workoutPlans_planId_fk" FOREIGN KEY ("planId") REFERENCES "public"."workoutPlans"("planId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "mealPlan" DROP COLUMN "mealName";--> statement-breakpoint
ALTER TABLE "mealPlan" DROP COLUMN "calories";--> statement-breakpoint
ALTER TABLE "mealPlan" DROP COLUMN "protein";--> statement-breakpoint
ALTER TABLE "mealPlan" DROP COLUMN "carbs";--> statement-breakpoint
ALTER TABLE "mealPlan" DROP COLUMN "fats";
CREATE TABLE "favouriteMealPlans" (
	"id" text PRIMARY KEY NOT NULL,
	"mealId" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favouritePlans" (
	"id" text PRIMARY KEY NOT NULL,
	"planId" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workoutExercises" ALTER COLUMN "workDay" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workoutExercises" ALTER COLUMN "reps" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD COLUMN "showPublic" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "workoutExercises" ADD COLUMN "rest" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutPlans" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutPlans" ADD COLUMN "nutrition" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutPlans" ADD COLUMN "progression" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutPlans" ADD COLUMN "safety" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutPlans" ADD COLUMN "showPublic" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "favouriteMealPlans" ADD CONSTRAINT "favouriteMealPlans_mealId_mealPlan_mealId_fk" FOREIGN KEY ("mealId") REFERENCES "public"."mealPlan"("mealId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "favouriteMealPlans" ADD CONSTRAINT "favouriteMealPlans_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favouritePlans" ADD CONSTRAINT "favouritePlans_planId_workoutPlans_planId_fk" FOREIGN KEY ("planId") REFERENCES "public"."workoutPlans"("planId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "favouritePlans" ADD CONSTRAINT "favouritePlans_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."mealTime";--> statement-breakpoint
DROP TYPE "public"."workingDays";
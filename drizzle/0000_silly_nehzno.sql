CREATE TYPE "public"."mealTime" AS ENUM('Breakfast', 'Lunch', 'Dinner');--> statement-breakpoint
CREATE TYPE "public"."workingDays" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');--> statement-breakpoint
CREATE TABLE "UserInfo" (
	"userInfoId" text PRIMARY KEY NOT NULL,
	"weight" integer NOT NULL,
	"height" integer NOT NULL,
	"steps" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mealPlan" (
	"mealId" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"mealName" text NOT NULL,
	"calories" integer NOT NULL,
	"protein" integer NOT NULL,
	"carbs" integer NOT NULL,
	"fats" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "workOutLogs" (
	"exerciseId" text NOT NULL,
	"userId" text NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workoutExercises" (
	"exerciseId" text PRIMARY KEY NOT NULL,
	"workDay" "workingDays" NOT NULL,
	"planId" text NOT NULL,
	"exerciseName" text NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workoutPlans" (
	"planId" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"planName" text NOT NULL,
	"numberOfDays" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mealPlan" ADD CONSTRAINT "mealPlan_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workOutLogs" ADD CONSTRAINT "workOutLogs_exerciseId_workoutExercises_exerciseId_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."workoutExercises"("exerciseId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workOutLogs" ADD CONSTRAINT "workOutLogs_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workoutExercises" ADD CONSTRAINT "workoutExercises_planId_workoutPlans_planId_fk" FOREIGN KEY ("planId") REFERENCES "public"."workoutPlans"("planId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workoutPlans" ADD CONSTRAINT "workoutPlans_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
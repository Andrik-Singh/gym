import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
export const mealPlanTypeEnum = pgEnum("mealPlanTypeEnum", [
  "vegan",
  "vegetarian",
  "non_vegetarian",
  "keto",
  "paleo",
  "mediterranean",
  "low_carb",
  "high_protein",
]);
export const mealPlanTagsEnum =pgEnum("mealPlanTagsEnum",[
  "weight_loss",
  "strength_gain",
  "muscle_building",
  "endurance",
  "flexibility",
])
export const mealTimeEnum=pgEnum("mealTimeEnum",[
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "pre_workout",
  "post_workout",
])
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const UserInfoTable = pgTable("UserInfo", {
  userInfo: text("userInfoId").primaryKey(),
  weight: integer("weight").notNull(),
  height: integer("height").notNull(),
  steps: integer("steps").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});
export const workoutPlans = pgTable("workoutPlans", {
  planId: text("planId").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  planName: text("planName").notNull(),
  description: text("description").notNull(),
  numberOfDays: integer("numberOfDays").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  nutrition: text("nutrition").notNull(),
  progression: text("progression").notNull(),
  safety: text("safety").notNull(),
  showPublic: boolean("showPublic").default(false),
});
export const workoutExercises = pgTable("workoutExercises", {
  exerciseId: text("exerciseId").primaryKey(),
  workDay: integer("workDay").notNull().default(1),
  planId: text("planId")
    .notNull()
    .references(() => workoutPlans.planId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  exerciseName: text("exerciseName").notNull(),
  sets: integer("sets"),
  reps: text("reps"),
  rest: text("rest"),
});
export const favouritePlans = pgTable("favouritePlans", {
  id: text("id").primaryKey(),
  planId: text("planId")
    .notNull()
    .references(() => workoutPlans.planId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});
export const workOutLogs = pgTable("workOutLogs", {
  logId: text("logId").primaryKey(),
  exerciseId: text("exerciseId")
    .notNull()
    .references(() => workoutExercises.exerciseId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  userId: text("userId")
    .notNull()
    .references(() => user.id),
  sets: integer("sets").notNull(),
  reps: text("reps").notNull(),
  weight: integer("weight"),
  date: timestamp("date").notNull().defaultNow(),
});
export const mealPlan = pgTable("mealPlan", {
  mealPlanId: text("mealId").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  showPublic: boolean("showPublic").default(false),
  description: text("description").notNull(),
  mealPlanName: text("mealPlanName").notNull(),
  numberOfMealsInADay:integer("numberOfMealsInADay").default(3).notNull(),
  totalProtein:integer("totalProtein").notNull(),
  totalCarbs:integer("totalCarbs").notNull(),
  totalFats:integer("totalFats").notNull(),
  totalCalories:integer("totalCalories").notNull(),
});
export const mealPlanType = pgTable("mealPlanType", {
  mealPlanId: text("mealPlanId")
    .references(() => mealPlan.mealPlanId)
    .notNull(),
  mealPlanType:mealPlanTypeEnum("mealPlanType").notNull()
});
export const meal = pgTable("meal", {
  mealId: text("mealId").primaryKey(),
  mealPlanId: text("mealPlanId").references(() => mealPlan.mealPlanId, {
    onDelete: "cascade",
  }),
  mealName: text("mealName").notNull(),
  mealPlanTime:mealPlanTypeEnum("mealPlanTime").notNull(),
  calories: integer("calories").notNull(),
  protein: integer("protein").notNull(),
  carbs: integer("carbs").notNull(),
  fats: integer("fats").notNull(),
});
export const favouriteMealPlans = pgTable("favouriteMealPlans", {
  id: text("id").primaryKey(),
  mealId: text("mealId")
    .notNull()
    .references(() => mealPlan.mealPlanId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});
export const UserRelations = relations(user, ({ many }) => ({
  UserInfoTable: many(UserInfoTable),
  mealPlans: many(mealPlan),
  workoutLogs: many(workOutLogs),
  workoutPlans: many(workoutPlans),
}));
export const WorkoutLogsRelations = relations(workOutLogs, ({ one }) => ({
  exercise: one(workoutExercises, {
    fields: [workOutLogs.exerciseId],
    references: [workoutExercises.exerciseId],
  }),
  user: one(user, {
    fields: [workOutLogs.userId],
    references: [user.id],
  }),
}));
export const workoutExercisesRelations = relations(
  workoutExercises,
  ({ one, many }) => ({
    workoutLogs: many(workOutLogs),
    plan: one(workoutPlans, {
      fields: [workoutExercises.planId],
      references: [workoutPlans.planId],
    }),
  })
);
export const WorkoutPlansRelations = relations(
  workoutPlans,
  ({ one, many }) => ({
    exercise: many(workoutExercises),
    favouritePlans: many(favouritePlans),
    user: one(user, {
      fields: [workoutPlans.userId],
      references: [user.id],
    }),
  })
);
export const favouritePlansRelations = relations(favouritePlans, ({ one }) => ({
  workoutPlan: one(workoutPlans, {
    fields: [favouritePlans.planId],
    references: [workoutPlans.planId],
  }),
  user: one(user, {
    fields: [favouritePlans.userId],
    references: [user.id],
  }),
}));
export const MealPlanRelations = relations(mealPlan, ({ one, many }) => ({
  user: one(user, {
    fields: [mealPlan.userId],
    references: [user.id],
  }),
  favouriteMealPlans: many(favouriteMealPlans),
}));
export const favouriteMealPlansRelations = relations(
  favouriteMealPlans,
  ({ one }) => ({
    meal: one(mealPlan, {
      fields: [favouriteMealPlans.mealId],
      references: [mealPlan.mealPlanId],
    }),
    user: one(user, {
      fields: [favouriteMealPlans.userId],
      references: [user.id],
    }),
  })
);
export const UserInfoRelations = relations(UserInfoTable, ({ one }) => ({
  user: one(user, {
    fields: [UserInfoTable.userId],
    references: [user.id],
  }),
}));

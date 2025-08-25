import {integer, pgEnum, pgTable, text, timestamp,boolean} from "drizzle-orm/pg-core";
export const workingDays=pgEnum("workingDays",["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"])
export const mealTime=pgEnum("mealTime",["Breakfast","Lunch","Dinner"])

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
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const UserInfoTable=pgTable("UserInfo",{
    userInfo:text("userInfoId").primaryKey(),
    weight:integer("weight").notNull(),
    height:integer("height").notNull(),
    steps:integer("steps").notNull(),
    date:timestamp("date").notNull().defaultNow(),
    userId:text("userId").notNull().references(() => user.id)
})
export const workoutPlans=pgTable("workoutPlans",{
    planId:text("planId").primaryKey(),
    userId:text("userId").notNull().references(() => user.id),
    planName:text("planName").notNull(),
    numberOfDays:integer("numberOfDays").notNull(),
    createdAt:timestamp("createdAt").notNull().defaultNow()
})
export const workoutExercises=pgTable("workoutExercises",{
    exerciseId:text("exerciseId").primaryKey(),
    workDay:workingDays("workDay").notNull(),
    planId:text("planId").notNull().references(() => workoutPlans.planId),
    exerciseName:text("exerciseName").notNull(),
    sets:integer("sets").notNull(),
    reps:integer("reps").notNull(),
})
export const workOutLogs=pgTable("workOutLogs",{
    exerciseId:text("exerciseId").notNull().references(() => workoutExercises.exerciseId),
    userId:text("userId").notNull().references(() => user.id),
    sets:integer("sets").notNull(),
    reps:integer("reps").notNull(),
    date:timestamp("date").notNull().defaultNow()
})
export const mealPlan=pgTable("mealPlan",{
    mealId:text("mealId").primaryKey(),
    userId:text("userId").notNull().references(() => user.id),
    mealName:text("mealName").notNull(),
    calories:integer("calories").notNull(),
    protein:integer("protein").notNull(),
    carbs:integer("carbs").notNull(),
    fats:integer("fats").notNull(),
    createdAt:timestamp("createdAt").notNull().defaultNow()
})
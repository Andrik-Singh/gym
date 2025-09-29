"use server";
import { db } from "@/db";
import { getAuth } from "../get";
import { asc, desc, eq, sql } from "drizzle-orm";
import { UserInfoTable, workOutLogs } from "@/db/schema";
import { error } from "console";

export async function getUserDetails(type: string) {
  try {
    const authData = await getAuth();
    if (!authData) {
      return {
        data: null,
        error: "Unauthorized user",
      };
    }
    const { user } = authData;
    console.log(type);
    let data;
    switch (type) {
      case "weight":
        console.log("weight");
        const weight = await db.query.UserInfoTable.findMany({
          where: eq(UserInfoTable.userId, user.id),
          columns: {
            weight: true,
            date: true,
          },
        });
        data = weight;
        break;
      case "steps":
        console.log("steps");
        const steps = await db.query.UserInfoTable.findMany({
          where: eq(UserInfoTable.userId, user.id),
          columns: {
            steps: true,
            date: true,
          },
        });
        data = steps;
        break;
      case "gym consistency":
        console.log("consistency");
        const consistency = await db
          .select({
            date: sql`DATE(${workOutLogs.date})`.as("date"),
          })
          .from(workOutLogs)
          .groupBy(sql`DATE(${workOutLogs.date})`)
          .orderBy(desc(sql`DATE(${workOutLogs.date})`));
        data = consistency;
        break;
      default:
        console.log("default");
        data = null;
    }
    return {
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "Server error occured",
    };
  }
}

"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export async function getAuth() {
  try {
    const data = auth.api.getSession({
      headers: await headers(),
    });
    return data;
  } catch (error) {
    return null
  }
}
export async function cutOffDate(day: number) {
  const date = new Date();
  date.setDate(date.getDate() - day);
  return date;
}

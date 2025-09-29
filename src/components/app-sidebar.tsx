"use client";
import {
  CookingPot,
  Home,
  ChartNoAxesCombined,
  Logs,
  Activity,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import { ModeToggle } from "./ChangeTheme";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Workout Plans",
    url: "/dashboard/workout-plans",
    icon: Activity,
  },
  {
    title: "Workout Logs",
    url: "/dashboard/workout-logs",
    icon: Logs,
  },
  {
    title: "MealPlan",
    url: "/dashboard/meal-plan",
    icon: CookingPot,
  },
  {
    title: "Progress",
    url: "/dashboard/progress",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Profile",
    url: "/dashboard/settings",
    icon: User2,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center flex-row justify-between w-full">
              <span>
                <Logo />
              </span>
              <span>
                <SidebarTrigger />
              </span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!open && <SidebarTrigger className="md:block hidden ml-[20%]" />}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <ModeToggle></ModeToggle>
                                
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

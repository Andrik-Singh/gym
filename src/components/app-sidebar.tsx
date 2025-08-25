'use client'
import { Calendar, Home, ChartNoAxesCombined,Logs, Settings } from "lucide-react"

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
} from "@/components/ui/sidebar"
import Logo from "./Logo"

// Menu items.
const items = [
  {
    title: "Workout Plans",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Workout Logs",
    url: "/dashboard/wprkout-logs",
    icon: Logs,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Progress",
    url: "/dashboard/progress",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const {open} = useSidebar()
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center flex-row justify-between w-full">
                <span>
                    <Logo/>
                </span>
                <span>
                    <SidebarTrigger/>
                </span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                {!open && <SidebarTrigger/>}
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
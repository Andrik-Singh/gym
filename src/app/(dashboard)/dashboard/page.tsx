
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ActivityIcon,
  Calendar,
  ChartNoAxesCombined,
  Home,
  Logs,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const items = [
    {
      title: "Home",
      url: "/dashboard",
      description: "Your personalized dashboard overview",
      icon: Home,
    },
    {
      title: "Workout Plans",
      url: "/dashboard/workout-plans",
      description: "View and manage your workout routines",
      icon: ActivityIcon,
    },
    {
      title: "Workout Logs",
      url: "/dashboard/workout-logs",
      description: "Track and review your past workout sessions",
      icon: Logs,
    },
    {
      title: "Meal Plan",
      url: "/dashboard/meal-plan",
      description: "Check some delicious meal plans",
      icon: Calendar,
    },
    {
      title: "Progress",
      url: "/dashboard/progress",
      description: "See your fitness progress over time",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      description: "Adjust your preferences and app settings",
      icon: Settings,
    },
  ];

  return (
    <section className="ml-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
        {items.map((item, index) => (
          <Link key={index} href={item.url}>
            <Card className="cursor-pointer transition hover:shadow-xl hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center gap-3">
                <item.icon className="w-6 h-6 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Page;

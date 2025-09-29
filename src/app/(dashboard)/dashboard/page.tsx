import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ActivityIcon,
  Apple,
  Calendar,
  ChartNoAxesCombined,
  Clock,
  Eye,
  EyeOff,
  Home,
  Logs,
  Shield,
  TrendingUp,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllPlans } from "@/lib/server/plans/get";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { checkStringLength } from "@/lib/utils";

const Page = async () => {
  const res = await getAllPlans();
  if (!res || !res.data) notFound();
  console.log(res);
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
      title: "Profile",
      url: "/dashboard/settings",
      description: "See all your favourite meals and plans",
      icon: User2,
    },
  ];

  return (
    <section className="md:ml-20 ml-5 pt-5">
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
      <h1 className="px-5 mt-5 text-2xl font-semibold">Some popular workout plans</h1>
      <div className="px-5 mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {res.data.map((plan) => {
          return (
            <Card
              key={plan.planId}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-emerald-50/30 hover:from-emerald-50/50 hover:to-emerald-100/40"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {plan.planName}
                    </CardTitle>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge
                      variant={plan.showPublic ? "default" : "secondary"}
                      className={`${
                        plan.showPublic
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {plan.showPublic ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Public
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          Private
                        </>
                      )}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{plan.numberOfDays} days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>
                      Created{" "}
                      {plan.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        day: "numeric",
                        month: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Apple className="w-4 h-4 text-green-600" />
                    <h4 className="font-semibold text-green-800">Nutrition</h4>
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed">
                    {checkStringLength(plan.nutrition)}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Progression</h4>
                  </div>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    {checkStringLength(plan.progression)}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <h4 className="font-semibold text-amber-800">Safety</h4>
                  </div>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    {checkStringLength(plan.safety)}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/dashboard/workout-plans/${plan.planId}`}>
                    View Plan
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Page;

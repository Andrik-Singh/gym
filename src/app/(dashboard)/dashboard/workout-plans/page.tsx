import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getPlans from "@/lib/server/plans/get";
import { Calendar, Dumbbell, Plus, Target } from "lucide-react";
import Link from "next/link";
interface Data {
  success: boolean;
  data: {
    planId: string;
    userId: string;
    planName: string;
    numberOfDays: number;
    createdAt: Date;
  }[];
  error: string;
}
const page = async () => {
  const res: Data = await getPlans();
  if (!res.success) {
    throw new Error(res?.error);
  }
  
  const data = res.data;
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              Your Workout Plans
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your fitness journey with AI-powered workout plans tailored to your goals
          </p>
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                <Dumbbell className="h-16 w-16 text-emerald-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">Ready to Start Your Fitness Journey?</h2>
              <p className="text-muted-foreground max-w-md">
                Create your first AI-powered workout plan and take the first step towards your fitness goals.
              </p>
            </div>

            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
              <Link href="/dashboard/new-plan" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Your First Plan
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  {data.length} {data.length === 1 ? "Plan" : "Plans"}
                </Badge>
              </div>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/dashboard/new-plan" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Plan
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((plan) => (
                <Card
                  key={plan.planId}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <Dumbbell className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-emerald-700 transition-colors">
                            {plan.planName}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{plan.numberOfDays} days</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        Created{" "}
                        {new Date(plan.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-200 bg-transparent"
                      >
                        <Link href={`/dashboard/workout-plans/${plan.planId}`}>View Plan</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default page;

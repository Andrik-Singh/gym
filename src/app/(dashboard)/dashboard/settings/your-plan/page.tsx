
import getPlans from "@/lib/server/plans/get";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Calendar, Clock, Eye, EyeOff, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import EmptyPlanCard from "@/components/Empty-Plan-Card";
const page = async () => {
  const res = await getPlans();
  console.log(res);
  if (!res || !res.data) notFound();
  if(res.data.length === 0){
    return(
      <EmptyPlanCard/>
    )
  }
  return (
    <div className="md:pl-20 pl-0 px-5 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {res.data.map((plan) => {
        return (
          <Card
            key={plan.planId}
            className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-emerald-50/30 hover:from-emerald-50/50 hover:to-emerald-100/40 dark:bg-black"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors dark:text-secondary">
                    {plan.planName}
                  </CardTitle>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge
                    variant={
                      plan.showPublic ? "default" : "secondary"
                    }
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

              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-secondary">
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
              {/* Nutrition Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <Apple className="w-4 h-4 text-green-600" />
                  <h4 className="font-semibold text-green-800">Nutrition</h4>
                </div>
                <p className="text-sm text-green-700 leading-relaxed">
                  {plan.nutrition}
                </p>
              </div>

              {/* Progression Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Progression</h4>
                </div>
                <p className="text-sm text-blue-700 leading-relaxed">
                  {plan.progression}
                </p>
              </div>

              {/* Safety Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <h4 className="font-semibold text-amber-800">Safety</h4>
                </div>
                <p className="text-sm text-amber-700 leading-relaxed">
                  {plan.safety}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link
                  href={`/dashboard/workout-plans/${plan.planId}`}
                >
                  View Plan
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default page;

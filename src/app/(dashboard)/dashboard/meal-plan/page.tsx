import { CookingPot } from "lucide-react";

const Page = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex items-center gap-4 md:gap-6 mb-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-gray-800 dark:text-gray-50">
          <CookingPot className="w-10 h-10 text-orange-500" />
          <h1>Meal Plans</h1>
        </div>
      </header>
    </div>
  );
};

export default Page;

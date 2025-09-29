import React from "react";

const loading = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="h-6 w-1/3 rounded bg-gray-200"></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-3"
            >
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
              <div className="h-32 w-full rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;

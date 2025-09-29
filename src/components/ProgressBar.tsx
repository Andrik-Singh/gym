"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getUserDetails } from "@/lib/server/userDetails/get";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type DataType = "weight" | "steps" | "gym consistency";

interface ProcessedDataItem {
  date: string;
  value: number;
  displayDate?: string;
  sessions?: number;
}

interface Stats {
  avg: string;
  max: number;
  min: number;
  latest: number;
  trend: number;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  unit: string;
  trend?: number;
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  dataType: DataType;
  label?: string | number;
  payload:
    | Array<{
        value?: number | string | null; // The value of the data point
        name?: string | number; // The key or label for this data point
        unit?: string; // The original data item
        color?: string;
      }>
    | undefined;
}

// Match the actual return type from getUserDetails
interface UserDetailsResponse {
  data: { date: unknown; [key: string]: unknown }[] | null;
  error: string | null;
}

type MemoizedDataType = Record<DataType, ProcessedDataItem[]>;

// Helper function with proper typing
function getWeek(dateStr: string | Date): number {
  const date = new Date(dateStr);
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);

  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const diff = target.getTime() - firstThursday.getTime();
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

const changeToData = (
  rawData: { date: unknown; [key: string]: unknown }[] | null,
  dataType: DataType
): ProcessedDataItem[] => {
  if (!rawData || rawData.length === 0) return [];
  if (dataType === "gym consistency") {
    const weeklyData: Record<
      string,
      {
        [key: string]: unknown;
        date: unknown;
      }[]
    > = rawData.reduce(
      (acc, item) => {
        const d = new Date(item.date as string | Date);
        const year = d.getFullYear();
        const week = getWeek(item.date as string | Date);
        const key = `W${week} ${year}`;

        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {} as Record<
        string,
        {
          [key: string]: unknown;
          date: unknown;
        }[]
      >
    );

    return Object.entries(weeklyData)
      .map(([week, items]) => ({
        date: week,
        value: items.length,
        sessions: items.length,
      }))
      .sort((a, b) => {
        const [weekA, yearA] = a.date.split(" ");
        const [weekB, yearB] = b.date.split(" ");
        if (yearA !== yearB) return yearA.localeCompare(yearB);
        return parseInt(weekA.slice(1)) - parseInt(weekB.slice(1));
      });
  }

  return rawData.map((data) => {
    const dateValue = data.date as string | Date;
    const dateObj =
      typeof dateValue === "object" ? dateValue : new Date(dateValue);

    const dateStr = dateObj.toLocaleDateString();

    return {
      date: dateStr,
      value: (data.steps || data.weight || 0) as number,
      displayDate: dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });
};
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  dataType,
}) => {
  console.log(payload, label);
  if (!active || !payload || !payload.length) return null;
  console.log(payload, label);
  const getUnit = (): string => {
    switch (dataType) {
      case "weight":
        return "kg";
      case "steps":
        return "steps";
      case "gym consistency":
        return "sessions";
      default:
        return "";
    }
  };

  const value = payload[0].value as number;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-lg font-bold text-blue-600">
        {value.toLocaleString()} {getUnit()}
      </p>
    </div>
  );
};
const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit, trend }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
      {trend !== undefined && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className={`text-xs font-medium ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
          <span className="text-xs text-gray-500">vs last period</span>
        </div>
      )}
    </div>
  );
};

const ProgressBar: React.FC = () => {
  const details: DataType[] = ["weight", "steps", "gym consistency"];
  const [memoizedData] = useState<Partial<MemoizedDataType>>({});
  const [currentLine, setCurrentLine] = useState<DataType | "">("");
  const [data, setData] = useState<ProcessedDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate statistics with proper typing
  const stats = useMemo<Stats | null>(() => {
    if (!data || data.length === 0) return null;

    const values = data.map((d) => d.value);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const latest = values[values.length - 1];
    const previous = values[values.length - 2] || latest;
    const trend = previous
      ? parseFloat((((latest - previous) / previous) * 100).toFixed(1))
      : 0;

    return {
      avg: avg.toFixed(1),
      max,
      min,
      latest,
      trend,
    };
  }, [data]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!currentLine) return;

      if (memoizedData[currentLine]) {
        setData(memoizedData[currentLine]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res: UserDetailsResponse = await getUserDetails(currentLine);
        if (res.error) {
          throw new Error(res.error);
        }

        if (!res.data) {
          throw new Error("No data received");
        }

        const processedData = changeToData(res.data, currentLine);
        memoizedData[currentLine] = processedData;
        setData(processedData);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        console.error(error);
        setError(errorMessage);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLine, memoizedData]);

  // Chart color mapping with proper typing
  const getChartColor = (dataType: DataType | ""): string => {
    const colorMap: Record<DataType, string> = {
      weight: "#8B5CF6",
      steps: "#3B82F6",
      "gym consistency": "#10B981",
    };
    return dataType ? colorMap[dataType] : "#3B82F6";
  };

  const renderChart = (): React.ReactElement => {
    if (loading) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-500">No data available</div>
        </div>
      );
    }

    const chartColor = getChartColor(currentLine);

    if (currentLine === "gym consistency") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#666" style={{ fontSize: 12 }} />
            <YAxis stroke="#666" style={{ fontSize: 12 }} />
            <Tooltip
              content={(props) => (
                <CustomTooltip {...props} dataType={currentLine} />
              )}
            />
            <Bar
              dataKey="value"
              fill="url(#colorBar)"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="displayDate" stroke="#666" style={{ fontSize: 12 }} />
          <YAxis stroke="#666" style={{ fontSize: 12 }} />
          <Tooltip
            content={(props) => (
              <CustomTooltip {...props} dataType={currentLine as DataType} />
            )}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={3}
            fill="url(#colorGradient)"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const getUnit = (): string => {
    switch (currentLine) {
      case "weight":
        return "kg";
      case "steps":
        return "steps";
      case "gym consistency":
        return "sessions/week";
      default:
        return "";
    }
  };

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl p-6 w-full">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Progress Tracker
            </h1>
            {currentLine && (
              <p className="text-gray-600">
                Tracking your{" "}
                <span className="font-semibold text-blue-600">
                  {currentLine}
                </span>
              </p>
            )}
          </div>
          <Select
            onValueChange={(value: string) => setCurrentLine(value as DataType)}
          >
            <SelectTrigger className="w-[200px] bg-white border-gray-200">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {details.map((detail) => (
                <SelectItem key={detail} value={detail}>
                  {detail.charAt(0).toUpperCase() + detail.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        {stats && currentLine && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="Current"
              value={stats.latest}
              unit={getUnit()}
              trend={stats.trend}
            />
            <StatsCard title="Average" value={stats.avg} unit={getUnit()} />
            <StatsCard title="Maximum" value={stats.max} unit={getUnit()} />
            <StatsCard title="Minimum" value={stats.min} unit={getUnit()} />
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        {currentLine ? (
          renderChart()
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            Please select a metric to view progress
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgressBar;

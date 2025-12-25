"use client";

import { useState, useEffect, useMemo } from "react";
import { TYPOGRAPHY } from "@/constants/typography";
import type { HeatMapProps, HeatMapData, HeatMapStats } from "./types";

const defaultStats: HeatMapStats = {
  totalSubmissions: 708,
  totalActiveDays: 133,
  maxStreak: 35,
};

const getActivityColor = (count: number): string => {
  if (count === 0) return "bg-[#ebedf0]";
  if (count === 1) return "bg-[#9be9a8]";
  if (count === 2) return "bg-[#40c463]";
  if (count >= 3 && count < 5) return "bg-[#30a14e]";
  return "bg-[#216e39]";
};

const generateYearData = (year: number): HeatMapData[] => {
  const data: HeatMapData[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yearStart = new Date(year, 0, 1);
  yearStart.setHours(0, 0, 0, 0);
  const yearEnd = year === today.getFullYear() ? today : new Date(year, 11, 31);
  yearEnd.setHours(0, 0, 0, 0);

  const seed = year * 1000;
  for (let d = new Date(yearStart); d <= yearEnd; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const dayOfYear = Math.floor((d.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
    const random = (seed + dayOfYear) % 100;
    data.push({
      date: dateStr,
      count: Math.floor((random % 20) / 4),
    });
  }

  return data;
};

const getMonthLabel = (date: Date): string => {
  return date.toLocaleDateString("en-US", { month: "short" });
};

const START_YEAR = 2020;

export function HeatMap({ data: propData, stats = defaultStats }: HeatMapProps) {
  const [mounted, setMounted] = useState(false);
  const [allYearData, setAllYearData] = useState<Map<number, HeatMapData[]>>(new Map());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const years = useMemo(
    () => Array.from({ length: currentYear - START_YEAR + 1 }, (_, i) => START_YEAR + i).reverse(),
    [currentYear]
  );

  useEffect(() => {
    setMounted(true);
    if (!propData) {
      const yearDataMap = new Map<number, HeatMapData[]>();
      for (let year = START_YEAR; year <= currentYear; year++) {
        yearDataMap.set(year, generateYearData(year));
      }
      setAllYearData(yearDataMap);
    }
  }, [propData, currentYear]);

  const currentYearData = propData || allYearData.get(selectedYear) || [];

  if (!mounted) {
    return (
      <div className="border-t border-dashed border-gray-300 pt-6 mt-6">
        <div className="bg-white rounded-xl p-6 border border-gray-300/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <span className={`${TYPOGRAPHY.content.class} text-gray-700`}>
                <strong className="font-bold text-gray-900">{stats.totalSubmissions}</strong> submissions in the past one year
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneYearAgo = new Date(today);
  oneYearAgo.setDate(oneYearAgo.getDate() - 364);
  oneYearAgo.setHours(0, 0, 0, 0);

  const dataMap = new Map<string, number>();
  currentYearData.forEach((item) => {
    dataMap.set(item.date, item.count);
  });

  const allDays: { date: Date; count: number; month: number; year: number }[] = [];
  
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const dayYear = d.getFullYear();
    const rawCount = dataMap.get(dateStr) || 0;
    const displayCount = dayYear === selectedYear ? rawCount : 0;
    allDays.push({
      date: new Date(d),
      count: displayCount,
      month: d.getMonth(),
      year: d.getFullYear(),
    });
  }

  const months: { month: number; year: number; days: { date: Date; count: number }[] }[] = [];
  let currentMonth: { month: number; year: number; days: { date: Date; count: number }[] } | null = null;

  allDays.forEach((day) => {
    const monthKey = `${day.year}-${day.month}`;
    if (!currentMonth || `${currentMonth.year}-${currentMonth.month}` !== monthKey) {
      if (currentMonth) {
        months.push(currentMonth);
      }
      currentMonth = {
        month: day.month,
        year: day.year,
        days: [],
      };
    }
    currentMonth.days.push({ date: day.date, count: day.count });
  });

  if (currentMonth) {
    months.push(currentMonth);
  }

  const monthBlocks: { month: number; year: number; weeks: { date: Date; count: number; isPadding: boolean }[][] }[] = [];

  months.forEach((monthData) => {
    const weeks: { date: Date; count: number; isPadding: boolean }[][] = [];
    let currentWeek: { date: Date; count: number; isPadding: boolean }[] = [];

    monthData.days.forEach((day) => {
      const dayOfWeek = day.date.getDay();
      currentWeek.push({ ...day, isPadding: false });

      if (dayOfWeek === 6) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        const lastDay = currentWeek[currentWeek.length - 1].date;
        const nextDay = new Date(lastDay);
        nextDay.setDate(nextDay.getDate() + 1);
        currentWeek.push({
          date: nextDay,
          count: 0,
          isPadding: true,
        });
      }
      weeks.push(currentWeek);
    }

    monthBlocks.push({
      month: monthData.month,
      year: monthData.year,
      weeks,
    });
  });


  return (
    <div className="border-t border-dashed border-gray-300 pt-6 mt-6">
      <div className="bg-white rounded-xl p-6 border border-gray-300/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <span className={`${TYPOGRAPHY.content.class} text-gray-700`}>
                <strong className="font-bold text-gray-900">{stats.totalSubmissions}</strong> submissions in {selectedYear === currentYear ? 'the past one year' : selectedYear.toString()}
              </span>
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className={TYPOGRAPHY.content.class}>
              <span className="text-gray-600">Total active days: </span>
              <span className="font-semibold text-gray-900">{stats.totalActiveDays}</span>
            </div>
            <div className={TYPOGRAPHY.content.class}>
              <span className="text-gray-600">Max streak: </span>
              <span className="font-semibold text-gray-900">{stats.maxStreak}</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${TYPOGRAPHY.content.class} text-gray-700 hover:text-gray-900 flex items-center gap-1`}
              >
                {selectedYear === currentYear ? 'Current' : selectedYear}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300/30 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left ${TYPOGRAPHY.content.class} ${
                          selectedYear === year
                            ? 'bg-gray-100 text-gray-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {year === currentYear ? 'Current' : year.toString()}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max">
            {monthBlocks.map((monthBlock, blockIndex) => {
              const firstDay = monthBlock.weeks[0]?.find(d => !d.isPadding);
              const shouldShowLabel = firstDay && firstDay.date.getFullYear() === currentYear;
              
              return (
                <div key={`${monthBlock.year}-${monthBlock.month}`} className="flex flex-col">
                  <div className="flex gap-1">
                    {monthBlock.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                          <div
                            key={`${blockIndex}-${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 rounded ${day.isPadding ? 'bg-transparent border-0' : getActivityColor(day.count)}`}
                            title={!day.isPadding ? `${day.date.toISOString().split('T')[0]}: ${day.count} submissions` : ''}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className={`${TYPOGRAPHY.content.class} ${shouldShowLabel ? 'text-gray-600' : 'text-transparent'} text-center mt-2`}>
                    {shouldShowLabel ? getMonthLabel(firstDay.date) : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-gray-600">
          <span className={TYPOGRAPHY.content.class}>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded bg-[#ebedf0]" />
            <div className="w-3 h-3 rounded bg-[#9be9a8]" />
            <div className="w-3 h-3 rounded bg-[#40c463]" />
            <div className="w-3 h-3 rounded bg-[#30a14e]" />
            <div className="w-3 h-3 rounded bg-[#216e39]" />
          </div>
          <span className={TYPOGRAPHY.content.class}>More</span>
        </div>
      </div>
    </div>
  );
}


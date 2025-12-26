"use client";

import { useMemo } from "react";
import { Dropdown } from "./Dropdown";
import type { DropdownOption } from "./Dropdown";

export interface DateRangePickerProps {
  label?: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  onStartMonthChange: (value: string) => void;
  onStartYearChange: (value: string) => void;
  onEndMonthChange: (value: string) => void;
  onEndYearChange: (value: string) => void;
  isEndDatePresent?: boolean;
  onIsPresentChange?: (isPresent: boolean) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const MONTHS: DropdownOption[] = [
  { value: "Jan", label: "January" },
  { value: "Feb", label: "February" },
  { value: "Mar", label: "March" },
  { value: "Apr", label: "April" },
  { value: "May", label: "May" },
  { value: "Jun", label: "June" },
  { value: "Jul", label: "July" },
  { value: "Aug", label: "August" },
  { value: "Sep", label: "September" },
  { value: "Oct", label: "October" },
  { value: "Nov", label: "November" },
  { value: "Dec", label: "December" },
];

export function DateRangePicker({
  label,
  startMonth,
  startYear,
  endMonth,
  endYear,
  onStartMonthChange,
  onStartYearChange,
  onEndMonthChange,
  onEndYearChange,
  isEndDatePresent = false,
  onIsPresentChange,
  error,
  required = false,
  disabled = false,
  className = "",
}: DateRangePickerProps) {
  const currentYear = new Date().getFullYear();
  const years: DropdownOption[] = useMemo(() => {
    const yearOptions: DropdownOption[] = [];
    for (let year = currentYear; year >= 1970; year--) {
      yearOptions.push({ value: year.toString(), label: year.toString() });
    }
    return yearOptions;
  }, [currentYear]);

  const formatDuration = () => {
    if (!startMonth || !startYear) return "";
    if (isEndDatePresent) {
      return `${startMonth} ${startYear} – Present`;
    }
    if (!endMonth || !endYear) return "";
    return `${startMonth} ${startYear} – ${endMonth} ${endYear}`;
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-4">
        <div>
          {label && (
            <label className={`block mb-3 text-[12px] font-medium text-gray-700`}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Dropdown
              placeholder="Start Month"
              value={startMonth}
              onChange={onStartMonthChange}
              options={MONTHS}
              disabled={disabled}
              required={required}
              maxVisibleItems={5}
            />
            <Dropdown
              placeholder="Start Year"
              value={startYear}
              onChange={onStartYearChange}
              options={years}
              disabled={disabled}
              required={required}
              maxVisibleItems={5}
            />
            <Dropdown
              placeholder="End Month"
              value={endMonth}
              onChange={onEndMonthChange}
              options={MONTHS}
              disabled={disabled || isEndDatePresent}
              required={required && !isEndDatePresent}
              maxVisibleItems={5}
            />
            <Dropdown
              placeholder="End Year"
              value={endYear}
              onChange={onEndYearChange}
              options={years}
              disabled={disabled || isEndDatePresent}
              required={required && !isEndDatePresent}
              maxVisibleItems={5}
            />
          </div>
          {onIsPresentChange && (
            <div className="mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEndDatePresent}
                  onChange={(e) => onIsPresentChange(e.target.checked)}
                  disabled={disabled}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-[12px] text-gray-700">Present (current job)</span>
              </label>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500 animate-fade-in">{error}</p>
        )}
        {startMonth && startYear && (isEndDatePresent || (endMonth && endYear)) && (
          <div className="mt-2">
            <p className="text-[12px] text-gray-600">
              Duration: <span className="font-medium text-gray-900">{formatDuration()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}




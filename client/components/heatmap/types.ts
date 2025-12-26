export interface HeatMapData {
  date: string;
  count: number;
}

export interface HeatMapStats {
  totalSubmissions: number;
  totalActiveDays: number;
  maxStreak: number;
}

export interface HeatMapColorScheme {
  empty: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
}

export interface HeatMapProps {
  data?: HeatMapData[];
  stats?: HeatMapStats;
  startYear?: number;
  label?: string;
  colorScheme?: HeatMapColorScheme;
  className?: string;
  isAdminMode?: boolean;
  onDayClick?: (date: string) => void;
  submissions?: Map<string, number>;
}


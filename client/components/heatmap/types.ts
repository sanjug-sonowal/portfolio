export interface HeatMapData {
  date: string;
  count: number;
}

export interface HeatMapStats {
  totalSubmissions: number;
  totalActiveDays: number;
  maxStreak: number;
}

export interface HeatMapProps {
  data?: HeatMapData[];
  stats?: HeatMapStats;
}


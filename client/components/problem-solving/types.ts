export interface ProblemSubmission {
  id: string;
  date: string;
  platform: string;
  problemName: string;
  problemLink: string;
  submissionLink: string;
}

export interface ProblemSolvingPlatform {
  id: string;
  name: string;
  icon?: string;
  stats?: {
    totalSolved?: number;
    easy?: number;
    medium?: number;
    hard?: number;
  };
}

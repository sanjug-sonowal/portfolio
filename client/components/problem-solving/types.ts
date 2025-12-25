export interface PlatformCard {
  id: string;
  name: string;
  icon: string;
  stats: {
    primary: string;
    secondary: string;
  };
}

export interface ProblemSolvingSectionProps {
  onPlatformClick: (platformId: string) => void;
}


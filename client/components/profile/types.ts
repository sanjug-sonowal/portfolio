export interface ProfileChip {
  id: string;
  label: string;
  icon?: File | string;
}

export interface Profile {
  id: string;
  name: string;
  chips: ProfileChip[];
  interviewReady: boolean;
  immediateJoiner: boolean;
  openToWork: boolean;
}

export interface ProfileCardProps {
  profile?: Profile;
}


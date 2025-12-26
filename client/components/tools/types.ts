export interface Tool {
  id: string;
  name: string;
  icon?: File | string;
  iconElement?: React.ReactNode;
}

export interface ToolsSectionProps {
  tools?: Tool[];
}


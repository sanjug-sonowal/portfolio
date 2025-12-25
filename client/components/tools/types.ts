export interface Tool {
  id: string;
  name: string;
  icon?: string;
  iconElement?: React.ReactNode;
}

export interface ToolsSectionProps {
  tools?: Tool[];
}


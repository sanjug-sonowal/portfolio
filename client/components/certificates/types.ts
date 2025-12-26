export interface Certificate {
  id: string;
  title: string;
  image: File | string;
  credentials?: string;
  link?: string;
}

export interface CertificatesSectionProps {
  certificates?: Certificate[];
}


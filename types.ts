export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // e.g., "Full-time", "Contract"
  salary?: string;
  description: string;
  url?: string;
  postedAt?: string;
  tags?: string[];
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

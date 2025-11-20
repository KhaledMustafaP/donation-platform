export interface Campaign {
  id: number;
  title: string;
  description: string;
  category?: string;
  goal?: number;
  raised?: number;
  imageUrl?: string;
  createdAt: string;
}

// interface `Campaign` is exported above

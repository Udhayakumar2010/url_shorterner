export interface UrlItem {
  id: number;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: string;
  clickCount: number;
  lastAccessedAt: string | null;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface DailyClick {
  date: string;
  clicks: number;
}

export interface AnalyticsResponse {
  urlId: number;
  originalUrl: string;
  shortCode: string;
  totalClicks: number;
  dailyClicks: DailyClick[];
}

export interface DailyStat {
  date: string;
  urlClicks: number;
  urlCreations: number;
}

export interface GlobalStatsResponse {
  stats: DailyStat[];
}

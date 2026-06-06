import axios from 'axios';
import type {
  AnalyticsResponse,
  GlobalStatsResponse,
  PagedResponse,
  UrlItem,
} from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

/** Create a new short URL */
export const createShortUrl = (originalUrl: string): Promise<UrlItem> =>
  api.post<UrlItem>('/urls', { originalUrl }).then((r) => r.data);

/** Fetch paginated list of URLs */
export const getUrls = (
  page: number,
  size: number = 10
): Promise<PagedResponse<UrlItem>> =>
  api.get<PagedResponse<UrlItem>>('/urls', { params: { page, size } }).then((r) => r.data);

/** Fetch analytics for a single URL */
export const getAnalytics = (id: number): Promise<AnalyticsResponse> =>
  api.get<AnalyticsResponse>(`/urls/${id}/analytics`).then((r) => r.data);

/** Fetch global click statistics */
export const getGlobalStats = (): Promise<GlobalStatsResponse> =>
  api.get<GlobalStatsResponse>('/urls/stats').then((r) => r.data);

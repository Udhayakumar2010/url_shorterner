import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

/** Create a new short URL */
export const createShortUrl = (originalUrl) =>
  api.post('/urls', { originalUrl }).then((r) => r.data);

/** Fetch paginated list of URLs */
export const getUrls = (page, size = 10) =>
  api.get('/urls', { params: { page, size } }).then((r) => r.data);

/** Fetch analytics for a single URL */
export const getAnalytics = (id) =>
  api.get(`/urls/${id}/analytics`).then((r) => r.data);

/** Fetch global click statistics */
export const getGlobalStats = () =>
  api.get('/urls/stats').then((r) => r.data);

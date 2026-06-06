package com.urlshortener.service;

import com.urlshortener.dto.AnalyticsResponse;
import com.urlshortener.dto.GlobalStatsResponse;
import com.urlshortener.dto.PagedResponse;
import com.urlshortener.dto.UrlRequest;
import com.urlshortener.dto.UrlResponse;

public interface UrlService {

    UrlResponse createShortUrl(UrlRequest request);

    PagedResponse<UrlResponse> getAllUrls(int page, int size);

    UrlResponse resolveAndTrack(String shortCode);

    AnalyticsResponse getAnalytics(Long id);

    GlobalStatsResponse getGlobalStats();
}

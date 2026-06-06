package com.urlshortener.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalyticsResponse {
    private Long urlId;
    private String originalUrl;
    private String shortCode;
    private Integer totalClicks;
    private List<DailyClick> dailyClicks;

    @Data
    @Builder
    public static class DailyClick {
        private String date;
        private Long clicks;
    }
}

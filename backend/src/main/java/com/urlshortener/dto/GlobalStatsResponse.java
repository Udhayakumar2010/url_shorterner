package com.urlshortener.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GlobalStatsResponse {
    private List<DailyStat> stats;

    @Data
    @Builder
    public static class DailyStat {
        private String date;
        private Long urlClicks;
        private Long urlCreations;
    }
}

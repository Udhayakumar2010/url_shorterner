package com.urlshortener.controller;

import com.urlshortener.dto.*;
import com.urlshortener.service.UrlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/urls")
@RequiredArgsConstructor
@Tag(name = "URL Shortener", description = "Endpoints for creating and managing short URLs")
public class UrlController {

    private final UrlService urlService;

    @PostMapping
    @Operation(summary = "Create a short URL")
    public ResponseEntity<UrlResponse> createShortUrl(@Valid @RequestBody UrlRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(urlService.createShortUrl(request));
    }

    @GetMapping
    @Operation(summary = "Get all URLs with pagination")
    public ResponseEntity<PagedResponse<UrlResponse>> getAllUrls(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(urlService.getAllUrls(page, size));
    }

    @GetMapping("/{id}/analytics")
    @Operation(summary = "Get analytics for a specific URL")
    public ResponseEntity<AnalyticsResponse> getAnalytics(@PathVariable Long id) {
        return ResponseEntity.ok(urlService.getAnalytics(id));
    }

    @GetMapping("/stats")
    @Operation(summary = "Get global click statistics for the chart")
    public ResponseEntity<GlobalStatsResponse> getGlobalStats() {
        return ResponseEntity.ok(urlService.getGlobalStats());
    }
}

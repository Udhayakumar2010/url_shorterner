package com.urlshortener.controller;

import com.urlshortener.dto.UrlResponse;
import com.urlshortener.service.UrlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Redirect", description = "Short URL redirect endpoint")
public class RedirectController {

    private final UrlService urlService;

    @GetMapping("/{shortCode}")
    @Operation(summary = "Redirect to original URL using short code")
    public ResponseEntity<Void> redirect(@PathVariable String shortCode) {
        // Resolve URL and track click
        UrlResponse urlResponse = urlService.resolveAndTrack(shortCode);

        // 302 redirect to original URL
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.LOCATION, urlResponse.getOriginalUrl());
        return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
    }
}

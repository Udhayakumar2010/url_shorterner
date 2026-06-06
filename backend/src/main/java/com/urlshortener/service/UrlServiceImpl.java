package com.urlshortener.service;

import com.urlshortener.dto.*;
import com.urlshortener.exception.InvalidUrlException;
import com.urlshortener.exception.UrlNotFoundException;
import com.urlshortener.mapper.UrlMapper;
import com.urlshortener.model.ClickEvent;
import com.urlshortener.model.Url;
import com.urlshortener.repository.ClickEventRepository;
import com.urlshortener.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.MalformedURLException;
import java.net.URL;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UrlServiceImpl implements UrlService {

    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int CODE_LENGTH = 6;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UrlRepository urlRepository;
    private final ClickEventRepository clickEventRepository;
    private final UrlMapper urlMapper;

    @Value("${app.base-url}")
    private String baseUrl;

    @Override
    @Transactional
    public UrlResponse createShortUrl(UrlRequest request) {
        String originalUrl = request.getOriginalUrl().trim();
        validateUrl(originalUrl);

        String shortCode = generateUniqueCode();
        Url url = Url.builder()
                .originalUrl(originalUrl)
                .shortCode(shortCode)
                .build();

        Url saved = urlRepository.save(url);
        log.info("Created short URL: {} -> {}", shortCode, originalUrl);
        return buildResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<UrlResponse> getAllUrls(int page, int size) {
        Page<Url> urlPage = urlRepository.findAll(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));

        List<UrlResponse> content = urlPage.getContent().stream()
                .map(this::buildResponse)
                .collect(Collectors.toList());

        return PagedResponse.<UrlResponse>builder()
                .content(content)
                .page(page)
                .size(size)
                .totalElements(urlPage.getTotalElements())
                .totalPages(urlPage.getTotalPages())
                .last(urlPage.isLast())
                .build();
    }

    @Override
    @Transactional
    public UrlResponse resolveAndTrack(String shortCode) {
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new UrlNotFoundException("Short URL not found: " + shortCode));

        // Increment click count and update last_accessed_at
        url.setClickCount(url.getClickCount() + 1);
        url.setLastAccessedAt(LocalDateTime.now());
        urlRepository.save(url);

        // Record click event
        clickEventRepository.save(ClickEvent.builder().url(url).build());

        log.info("Redirecting short code '{}' to '{}'", shortCode, url.getOriginalUrl());
        return buildResponse(url);
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsResponse getAnalytics(Long id) {
        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new UrlNotFoundException("URL not found with id: " + id));

        List<Object[]> rows = clickEventRepository.findDailyClicksByUrlId(id);
        List<AnalyticsResponse.DailyClick> dailyClicks = rows.stream()
                .map(row -> AnalyticsResponse.DailyClick.builder()
                        .date(row[0].toString())
                        .clicks(((Number) row[1]).longValue())
                        .build())
                .collect(Collectors.toList());

        return AnalyticsResponse.builder()
                .urlId(url.getId())
                .originalUrl(url.getOriginalUrl())
                .shortCode(url.getShortCode())
                .totalClicks(url.getClickCount())
                .dailyClicks(dailyClicks)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public GlobalStatsResponse getGlobalStats() {
        List<Object[]> rows = clickEventRepository.findGlobalDailyStats();
        List<GlobalStatsResponse.DailyStat> stats = rows.stream()
                .map(row -> GlobalStatsResponse.DailyStat.builder()
                        .date(row[0].toString())
                        .urlClicks(((Number) row[1]).longValue())
                        .urlCreations(((Number) row[2]).longValue())
                        .build())
                .collect(Collectors.toList());

        return GlobalStatsResponse.builder().stats(stats).build();
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private UrlResponse buildResponse(Url url) {
        UrlResponse response = urlMapper.toResponse(url);
        response.setShortUrl(baseUrl + "/" + url.getShortCode());
        return response;
    }

    private void validateUrl(String rawUrl) {
        try {
            URL url = new URL(rawUrl);
            String protocol = url.getProtocol();
            if (!"http".equalsIgnoreCase(protocol) && !"https".equalsIgnoreCase(protocol)) {
                throw new InvalidUrlException("URL must use HTTP or HTTPS protocol");
            }
        } catch (MalformedURLException e) {
            throw new InvalidUrlException("Invalid URL format: " + rawUrl);
        }
    }

    private String generateUniqueCode() {
        String code;
        int attempts = 0;
        do {
            code = randomCode();
            attempts++;
            if (attempts > 10) throw new RuntimeException("Could not generate unique short code");
        } while (urlRepository.existsByShortCode(code));
        return code;
    }

    private String randomCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
        }
        return sb.toString();
    }
}

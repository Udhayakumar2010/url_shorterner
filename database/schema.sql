-- URL Shortener Database Schema
-- Database: url_shortener

CREATE DATABASE IF NOT EXISTS url_shortener;
USE url_shortener;

CREATE TABLE IF NOT EXISTS urls (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    original_url    TEXT NOT NULL,
    short_code      VARCHAR(20) UNIQUE NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    click_count     INT DEFAULT 0,
    last_accessed_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS click_events (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    url_id      BIGINT NOT NULL,
    clicked_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (url_id) REFERENCES urls(id) ON DELETE CASCADE
);

-- URL Shortener Seed Data
USE url_shortener;

-- Insert sample URLs
INSERT INTO urls (original_url, short_code, created_at, click_count, last_accessed_at) VALUES
('https://www.codester.com/items/3423/easy-url-shortener-with-analytics-php-mysql', 'NDQ1', '2017-03-07 10:00:00', 2, '2017-03-07 15:00:00'),
('http://www.google.com', 'NDM0', '2017-03-03 09:00:00', 2, '2017-03-03 14:00:00'),
('http://tlt.tc', 'NDI4', '2017-03-01 08:00:00', 4, '2017-03-01 16:00:00'),
('https://www.codester.com/items/3423/easy-url-shortener-with-analytics-php-mysql', 'NDE4', '2017-03-01 08:30:00', 1, '2017-03-01 12:00:00'),
('http://google.com', 'NDA4', '2017-02-28 07:00:00', 2, '2017-02-28 11:00:00'),
('http://google.com', 'Mzk4', '2017-02-28 07:30:00', 1, '2017-02-28 10:00:00'),
('https://www.codester.com/', 'URLS1', '2017-02-27 06:00:00', 2, '2017-02-27 09:00:00'),
('https://db.tt/K4QBF9x2', 'Mzc4', '2017-02-27 06:30:00', 1, '2017-02-27 08:00:00'),
('https://www.codester.com/', 'MzY4', '2017-02-26 05:00:00', 2, '2017-02-26 07:00:00'),
('https://www.youtube.com/watch?v=Gh3m0sQNou8', 'Mzu4', '2017-02-26 05:30:00', 1, '2017-02-26 06:00:00'),
('https://github.com/spring-projects/spring-boot', 'abc123', NOW() - INTERVAL 2 DAY, 5, NOW() - INTERVAL 1 DAY),
('https://reactjs.org', 'def456', NOW() - INTERVAL 3 DAY, 3, NOW() - INTERVAL 2 DAY);

-- Insert click events for each URL
-- URL 1 (2 clicks)
INSERT INTO click_events (url_id, clicked_at) VALUES (1, '2017-03-07 11:00:00'), (1, '2017-03-07 15:00:00');
-- URL 2 (2 clicks)
INSERT INTO click_events (url_id, clicked_at) VALUES (2, '2017-03-03 10:00:00'), (2, '2017-03-03 14:00:00');
-- URL 3 (4 clicks)
INSERT INTO click_events (url_id, clicked_at) VALUES (3, '2017-03-01 09:00:00'), (3, '2017-03-01 11:00:00'), (3, '2017-03-01 13:00:00'), (3, '2017-03-01 16:00:00');
-- URL 4 (1 click)
INSERT INTO click_events (url_id, clicked_at) VALUES (4, '2017-03-01 12:00:00');
-- URL 5 (2 clicks)
INSERT INTO click_events (url_id, clicked_at) VALUES (5, '2017-02-28 08:00:00'), (5, '2017-02-28 11:00:00');
-- URL 6 (1 click)
INSERT INTO click_events (url_id, clicked_at) VALUES (6, '2017-02-28 10:00:00');
-- URL 7 (2 clicks)
INSERT INTO click_events (url_id, clicked_at) VALUES (7, '2017-02-27 07:00:00'), (7, '2017-02-27 09:00:00');
-- URL 8 (1 click)
INSERT INTO click_events (url_id, clicked_at) VALUES (8, '2017-02-27 08:00:00');
-- URL 9 (2 clicks)
INSERT INTO click_events (url_id, clicked_at) VALUES (9, '2017-02-26 06:00:00'), (9, '2017-02-26 07:00:00');
-- URL 10 (1 click)
INSERT INTO click_events (url_id, clicked_at) VALUES (10, '2017-02-26 06:00:00');
-- URL 11 (5 clicks)
INSERT INTO click_events (url_id, clicked_at) VALUES (11, NOW() - INTERVAL 2 DAY), (11, NOW() - INTERVAL 2 DAY), (11, NOW() - INTERVAL 1 DAY), (11, NOW() - INTERVAL 1 DAY), (11, NOW() - INTERVAL 1 DAY);
-- URL 12 (3 clicks)
INSERT INTO click_events (url_id, clicked_at) VALUES (12, NOW() - INTERVAL 3 DAY), (12, NOW() - INTERVAL 2 DAY), (12, NOW() - INTERVAL 1 DAY);

package com.urlshortener.repository;

import com.urlshortener.model.ClickEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClickEventRepository extends JpaRepository<ClickEvent, Long> {

    /**
     * Returns daily click counts for a specific URL (last 30 days).
     * Returns Object[] with [date_string, count].
     */
    @Query(value = """
            SELECT DATE(ce.clicked_at) AS click_date, COUNT(*) AS click_count
            FROM click_events ce
            WHERE ce.url_id = :urlId
              AND ce.clicked_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            GROUP BY DATE(ce.clicked_at)
            ORDER BY click_date ASC
            """, nativeQuery = true)
    List<Object[]> findDailyClicksByUrlId(@Param("urlId") Long urlId);

    /**
     * Returns aggregated daily stats for all URLs (last 30 days).
     * Returns Object[] with [date_string, total_clicks, url_creations].
     */
    @Query(value = """
            SELECT
                DATE(ce.clicked_at)              AS stat_date,
                COUNT(ce.id)                     AS total_clicks,
                COUNT(DISTINCT u.id)             AS url_creations
            FROM click_events ce
            JOIN urls u ON ce.url_id = u.id
            WHERE ce.clicked_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            GROUP BY DATE(ce.clicked_at)
            ORDER BY stat_date DESC
            LIMIT 14
            """, nativeQuery = true)
    List<Object[]> findGlobalDailyStats();
}

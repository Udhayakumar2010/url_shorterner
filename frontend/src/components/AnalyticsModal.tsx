import React from 'react';
import type { AnalyticsResponse } from '../types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  analytics: AnalyticsResponse;
  onClose: () => void;
}

const AnalyticsModal: React.FC<Props> = ({ analytics, onClose }) => {
  const chartData = analytics.dailyClicks.map((d) => ({
    date: d.date,
    clicks: d.clicks,
  }));

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-bar">
          <h5>📊 Analytics — {analytics.shortCode}</h5>
          <button
            id="analytics-modal-close"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close analytics"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="modal-body-content">
          {/* URL info */}
          <div className="modal-url-info">
            <div>
              <strong>Short URL:</strong>{' '}
              <a href={`http://localhost:8080/${analytics.shortCode}`} target="_blank" rel="noreferrer">
                {analytics.shortCode}
              </a>
            </div>
            <div className="mt-1">
              <strong>Original URL:</strong>{' '}
              <span className="text-muted" style={{ wordBreak: 'break-all' }}>
                {analytics.originalUrl}
              </span>
            </div>
            <div className="mt-1">
              <strong>Total Clicks:</strong>{' '}
              <span className="badge bg-primary">{analytics.totalClicks}</span>
            </div>
          </div>

          {/* Daily clicks chart */}
          {chartData.length > 0 ? (
            <>
              <p className="chart-title mb-2">Daily Click History</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: '0.8rem', borderRadius: '6px' }} />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    name="Clicks"
                    fill="#b2dfdb"
                    stroke="#26a69a"
                    strokeWidth={2}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </>
          ) : (
            <p className="text-center text-muted py-3">No click data in the last 30 days.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;

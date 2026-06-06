import React, { useEffect, useState } from 'react';
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getGlobalStats } from '../services/api';
import type { DailyStat } from '../types';

const Statistics: React.FC = () => {
  const [stats, setStats] = useState<DailyStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGlobalStats()
      .then((res) => {
        // Reverse so oldest is on the left, format date labels
        const sorted = [...res.stats].reverse().map((s) => ({
          ...s,
          label: formatDateLabel(s.date),
        }));
        setStats(sorted);
      })
      .catch(() => setStats([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', weekday: 'short' }).replace(',', 'th');
  };

  return (
    <div className="stats-section">
      <div className="section-header">Statistics</div>
      <div className="stats-chart-wrapper">
        <p className="chart-title">Recent Statistics of Click Counts</p>
        {loading ? (
          <div className="text-center py-4 text-muted">
            <div className="spinner-border spinner-border-sm me-2" role="status" />
            Loading statistics...
          </div>
        ) : stats.length === 0 ? (
          <div className="text-center py-4 text-muted">No statistics available yet.</div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart
              data={stats}
              margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#666' }}
                angle={-30}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fontSize: 11, fill: '#666' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #dee2e6',
                }}
              />
              <Legend
                iconType="line"
                wrapperStyle={{ fontSize: '0.82rem', paddingTop: '8px' }}
              />
              {/* Area for URL Clicks (teal/light) */}
              <Area
                type="monotone"
                dataKey="urlClicks"
                name="URL Clicks"
                fill="#b2dfdb"
                stroke="#26a69a"
                strokeWidth={2}
                fillOpacity={0.6}
              />
              {/* Bar for URL Creations (blue) */}
              <Bar
                dataKey="urlCreations"
                name="URL Creations"
                fill="#1565c0"
                radius={[3, 3, 0, 0]}
                barSize={20}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Statistics;

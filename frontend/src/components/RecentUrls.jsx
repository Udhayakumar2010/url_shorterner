import React, { useState } from 'react';
import { getAnalytics } from '../services/api';
import AnalyticsModal from './AnalyticsModal';

const RecentUrls = ({ urls, loading }) => {
  const [toast, setToast] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl).then(() => showToast('Copied to clipboard!'));
  };

  const handleOpen = (shortUrl) => {
    window.open(shortUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAnalytics = async (id) => {
    setAnalyticsLoading(true);
    try {
      const data = await getAnalytics(id);
      setAnalytics(data);
    } catch {
      showToast('Failed to load analytics.');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="section-card">
        <div className="section-header">Recent URLs</div>
        <div className="p-4 text-center text-muted">
          <div className="spinner-border spinner-border-sm me-2" role="status" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="section-card">
        <div className="section-header">Recent URLs</div>
        <div className="table-responsive">
          <table className="urls-table">
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th></th>
                <th>Created on</th>
                <th>Clicks</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {urls.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No URLs yet. Shorten your first URL above!
                  </td>
                </tr>
              ) : (
                urls.map((url) => (
                  <tr key={url.id}>
                    <td>
                      <div className="url-original" title={url.originalUrl}>
                        {url.originalUrl}
                      </div>
                    </td>
                    <td>
                      <a
                        href={url.shortUrl}
                        className="short-url-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={url.shortUrl}
                      >
                        🔗 {url.shortUrl}
                      </a>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button
                        id={`copy-btn-${url.id}`}
                        className="action-btn btn-copy"
                        title="Copy short URL"
                        onClick={() => handleCopy(url.shortUrl)}
                      >
                        📋
                      </button>
                      <button
                        id={`open-btn-${url.id}`}
                        className="action-btn btn-open"
                        title="Open original URL"
                        onClick={() => handleOpen(url.shortUrl)}
                      >
                        🔗
                      </button>
                    </td>
                    <td className="created-date">{formatDate(url.createdAt)}</td>
                    <td className="click-badge">{url.clickCount}</td>
                    <td>
                      <button
                        id={`analytics-btn-${url.id}`}
                        className="btn-analytics"
                        onClick={() => handleAnalytics(url.id)}
                        disabled={analyticsLoading}
                      >
                        📊 Analytics
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="toast-container">
          <div className="toast-msg">{toast}</div>
        </div>
      )}

      {/* Analytics modal */}
      {analytics && (
        <AnalyticsModal
          analytics={analytics}
          onClose={() => setAnalytics(null)}
        />
      )}
    </>
  );
};

export default RecentUrls;

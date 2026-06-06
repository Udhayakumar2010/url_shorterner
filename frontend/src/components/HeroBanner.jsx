import React, { useState } from 'react';
import { createShortUrl } from '../services/api';

const HeroBanner = ({ onUrlCreated }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!inputUrl.trim()) {
      setError('Please enter a URL.');
      return;
    }

    // Basic client-side URL format check
    try {
      new URL(inputUrl);
    } catch {
      setError('Please enter a valid URL (e.g. https://example.com).');
      return;
    }

    setLoading(true);
    try {
      const newUrl = await createShortUrl(inputUrl.trim());
      onUrlCreated(newUrl);
      setInputUrl('');
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to shorten URL. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-banner">
      <h1>Simplify your URL</h1>
      <form onSubmit={handleSubmit}>
        <div className="hero-input-group">
          <input
            id="url-input"
            type="text"
            className="form-control"
            placeholder="Enter your original URL eg. http://demos.nelliwinne.net/URLShortener/"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            disabled={loading}
          />
          <button
            id="shorten-btn"
            type="submit"
            className="btn-shorten"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                Shortening...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                </svg>
                Shorten URL
              </>
            )}
          </button>
        </div>
        {error && (
          <p className="hero-helper-text" style={{ color: '#ff9999' }}>
            {error}
          </p>
        )}
        {!error && (
          <p className="hero-helper-text">
            All the Shorted URL and their analytics are public...
          </p>
        )}
      </form>
    </section>
  );
};

export default HeroBanner;

import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import RecentUrls from './components/RecentUrls';
import Pagination from './components/Pagination';
import Statistics from './components/Statistics';
import { getUrls } from './services/api';

const PAGE_SIZE = 10;

const App = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUrls = useCallback(async (page) => {
    setLoading(true);
    try {
      const data = await getUrls(page, PAGE_SIZE);
      setUrls(data.content);
      setTotalPages(data.totalPages);
    } catch {
      console.error('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls(currentPage);
  }, [fetchUrls, currentPage]);

  const handleUrlCreated = (newUrl) => {
    // Prepend and refresh page 0 to reflect new entry
    setCurrentPage(0);
    fetchUrls(0);
    // Optimistically add at top
    setUrls((prev) => [newUrl, ...prev.slice(0, PAGE_SIZE - 1)]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUrls(page);
  };

  return (
    <div>
      <Header />
      <HeroBanner onUrlCreated={handleUrlCreated} />

      <main className="main-content">
        <RecentUrls urls={urls} loading={loading} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Statistics />
      </main>
    </div>
  );
};

export default App;

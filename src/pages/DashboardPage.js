import React, { useState, useEffect } from 'react';
import urlService from '../services/urlService';

function DashboardPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setToken(user.token);
      fetchUrls(user.token);
    }
  }, []);

  const fetchUrls = async (token) => {
    try {
      const data = await urlService.getUrls(token);
      setShortenedUrls(data); // Assuming the backend directly sends an array of URLs
    } catch (error) {
      console.error('Failed to fetch URLs', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await urlService.createShortUrl({ originalUrl }, token);
      // Assuming the backend sends the newly created URL object, which includes the shortUrl
      setShortenedUrls([...shortenedUrls, data]);
      setOriginalUrl('');
    } catch (error) {
      console.error('Failed to create short URL', error);
    }
  };

  return (
    <div>
      <h2>Shorten Your URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL here"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      <h3>Your Shortened URLs</h3>
      <ul>
        {shortenedUrls.map((url, index) => (
          <li key={index}>{url.shortUrl || url} {/* Adjust based on your URL object structure */}</li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;

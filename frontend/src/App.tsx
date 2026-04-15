import { useState, useEffect } from 'react';
import ShortenForm from './components/ShortenForm';
import ResultCard from './components/ResultCard';
import UrlTable from './components/UrlTable';
import { shortenUrl, getAllUrls } from './api/urlApi';
import type { UrlEntry } from './types';

export default function App() {
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [result, setResult] = useState<UrlEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const fetchUrls = async () => {
    try {
      const data = await getAllUrls();
      setUrls(data);
    } catch {
      setFetchError('Could not load URLs.');
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleShorten = async (url: string) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await shortenUrl({ original_url: url });
      setResult(data);
      fetchUrls();
    } catch {
      alert('Failed to shorten URL. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='app-wrapper'>
      <header className='app-header'>
        <h1>🔗 URL Shortener</h1>
        <p>Paste a long URL and get a clean short link instantly.</p>
      </header>

      <main className='app-main'>
        <section className='card'>
          <ShortenForm onShorten={handleShorten} loading={loading} />
          {result && <ResultCard result={result} />}
        </section>

        <section className='card'>
          <h2>All Shortened URLs</h2>
          {fetchError && <p className='error-msg'>{fetchError}</p>}
          <UrlTable urls={urls} />
        </section>
      </main>
    </div>
  );
}

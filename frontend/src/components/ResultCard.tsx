import { useState } from 'react';
import type { UrlEntry } from '../types';
import { getShortUrl } from '../api/urlApi';

interface Props {
  result: UrlEntry;
}

export default function ResultCard({ result }: Props) {
  const [copied, setCopied] = useState(false);
  const shortUrl = getShortUrl(result.short_code);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='result-card'>
      <p className='result-label'>✅ Your short URL is ready!</p>
      <div className='result-row'>
        <a
          href={shortUrl}
          target='_blank'
          rel='noreferrer'
          className='short-link'
        >
          {shortUrl}
        </a>
        <button onClick={handleCopy} className='copy-btn'>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p className='result-original'>
        Original: <span>{result.original_url}</span>
      </p>
    </div>
  );
}

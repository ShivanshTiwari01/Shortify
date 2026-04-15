import { useState } from 'react';

interface Props {
  onShorten: (url: string) => void;
  loading: boolean;
}

export default function ShortenForm({ onShorten, loading }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validate = (url: string) => {
    if (!url.trim()) return 'Please enter a URL.';
    if (!url.startsWith('http://') && !url.startsWith('https://'))
      return 'URL must start with http:// or https://';
    return '';
  };

  const handleSubmit = () => {
    const err = validate(value);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    onShorten(value);
    setValue('');
  };

  return (
    <div className='shorten-form'>
      <div className='input-row'>
        <input
          type='url'
          placeholder='Paste your long URL here...'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className={error ? 'input-error' : ''}
          disabled={loading}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten →'}
        </button>
      </div>
      {error && <p className='error-msg'>{error}</p>}
    </div>
  );
}

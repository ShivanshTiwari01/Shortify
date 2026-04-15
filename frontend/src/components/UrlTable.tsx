import type { UrlEntry } from '../types';
import { getShortUrl } from '../api/urlApi';

interface Props {
  urls: UrlEntry[];
}

export default function UrlTable({ urls }: Props) {
  if (urls.length === 0) {
    return <p className='empty-msg'>No URLs shortened yet. Try one above!</p>;
  }

  return (
    <div className='table-wrapper'>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short Link</th>
            <th>Clicks</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            <tr key={u.short_code}>
              <td>
                <a
                  href={u.original_url}
                  target='_blank'
                  rel='noreferrer'
                  title={u.original_url}
                >
                  {u.original_url.length > 45
                    ? u.original_url.slice(0, 45) + '...'
                    : u.original_url}
                </a>
              </td>
              <td>
                <a
                  href={getShortUrl(u.short_code)}
                  target='_blank'
                  rel='noreferrer'
                >
                  {u.short_code}
                </a>
              </td>
              <td className='clicks'>{u.click_count}</td>
              <td className='date'>
                {new Date(u.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

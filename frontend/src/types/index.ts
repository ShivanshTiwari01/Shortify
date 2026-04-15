export interface UrlEntry {
  original_url: string;
  short_code: string;
  created_at: string;
  click_count: number;
}

export interface ShortenPayload {
  original_url: string;
}

import axios from 'axios';
import type { UrlEntry, ShortenPayload } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

export const shortenUrl = async (
  payload: ShortenPayload,
): Promise<UrlEntry> => {
  const res = await api.post<UrlEntry>('/shorten', payload);
  return res.data;
};

export const getAllUrls = async (): Promise<UrlEntry[]> => {
  const res = await api.get<UrlEntry[]>('/all/urls');
  return res.data;
};

export const getStats = async (shortCode: string): Promise<UrlEntry> => {
  const res = await api.get<UrlEntry>(`/stats/${shortCode}`);
  return res.data;
};

export const getShortUrl = (shortCode: string) => `${BASE_URL}/${shortCode}`;

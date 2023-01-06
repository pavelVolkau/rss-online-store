import { SEPARATORS } from './constants';

export default function getQueryURI(): string {
  const link = window.location.href;
  const query = link.split(SEPARATORS.searchQuery)[1];

  if (query) return query;

  return '';
}

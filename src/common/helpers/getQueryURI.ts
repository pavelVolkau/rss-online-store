import { SEPARATORS } from './constants';

export default function getQueryURI(href: string): string {
  const query = href.split(SEPARATORS.searchQuery)[1];

  if (query) return query;

  return '';
}

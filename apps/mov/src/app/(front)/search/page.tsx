import SearchContainer from '@/components/search-container';
import MovieService from '@/services/MovieService';
import { redirect } from 'next/navigation';

interface SearchProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export const revalidate = 3600;

export default async function SearchPage({ searchParams }: SearchProps) {
  const { q } = await searchParams;

  if (!q?.trim()) {
    redirect('/home');
  }

  const shows = await MovieService.searchMovies(q);
  return <SearchContainer query={q} shows={shows.results} />;
}

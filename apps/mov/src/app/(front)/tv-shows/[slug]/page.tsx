import { type Metadata } from 'next';
import { handleMetadata } from '@/lib/utils';
import TvShowPage from '../page';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return handleMetadata(slug, 'tv-shows', 'tv');
}

export default async function Home() {
  return TvShowPage();
}

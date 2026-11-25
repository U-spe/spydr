import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = slug.split('-').pop();
  return <EmbedPlayer url={`https://vidsrc.to/embed/tv/${id}`} />;
}

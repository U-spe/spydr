import { Icons } from '@/components/icons';
import { env } from '@/env.mjs';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Silk+',
  author: 'Silk+',
  slogan: 'Good stories. Easy nights.',
  description:
    'Discover movies and series with Silk+. Explore popular titles, browse genres, and find your next watch.',
  keywords: [
    'Silk+',
    'movies',
    'TV shows',
    'series',
    'movie discovery',
    'entertainment',
    'popular movies',
    'popular TV shows',
  ],
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/images/hero.jpg`,
  links: {
    twitter: `${env.NEXT_PUBLIC_TWITTER}`,
    github: 'https://github.com/U-spe/cinegeek-beta',
    githubAccount: '',
  },
  socialLinks: [
    {
      title: 'Facebook',
      href: `${env.NEXT_PUBLIC_FACEBOOK}`,
      icon: Icons.facebook,
    },
    {
      title: 'Instagram',
      href: `${env.NEXT_PUBLIC_INSTAGRAM}`,
      icon: Icons.instagram,
    },
    {
      title: 'Twitter',
      href: `${env.NEXT_PUBLIC_TWITTER}`,
      icon: Icons.twitter,
    },
    {
      title: 'Youtube',
      href: `${env.NEXT_PUBLIC_YOUTUBE}`,
      icon: Icons.youtube,
    },
  ],
  footerItems: [] as { title: string; href: string }[],
  mainNav: [
    {
      title: 'Home',
      href: '/home',
    },
    {
      title: 'TV Shows',
      href: '/tv-shows',
    },
    {
      title: 'Movies',
      href: '/movies',
    },
    {
      title: 'New & Popular',
      href: '/new-and-popular',
    },
  ],
};

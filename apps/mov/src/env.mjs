import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    TMDB_READ_ACCESS_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
    NEXT_PUBLIC_SITE_NAME: z.string(),
    NEXT_PUBLIC_TWITTER: z.string().url().optional(),
    NEXT_PUBLIC_FACEBOOK: z.string().url().optional(),
    NEXT_PUBLIC_INSTAGRAM: z.string().url().optional(),
    NEXT_PUBLIC_YOUTUBE: z.string().url().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    TMDB_READ_ACCESS_TOKEN: process.env.TMDB_READ_ACCESS_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_TWITTER: process.env.NEXT_PUBLIC_TWITTER ?? "https://x.com",
    NEXT_PUBLIC_FACEBOOK: process.env.NEXT_PUBLIC_FACEBOOK ?? "https://facebook.com",
    NEXT_PUBLIC_INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM ?? "https://instagram.com",
    NEXT_PUBLIC_YOUTUBE: process.env.NEXT_PUBLIC_YOUTUBE ?? "https://youtube.com",
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "1",
});

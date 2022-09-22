import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import { config as envConfig } from 'dotenv';

envConfig();

export interface PrismicConfig {
  req?: HttpRequestLike;
}

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT);

  enableAutoPreviews({
    client,
    req: config?.req,
  });

  return client;
}

import { PrismicPreview } from '@prismicio/next';
import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import { Link } from 'prismic-dom';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <PrismicProvider
        internalLinkComponent={({ href, ...props }) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Link href={href}>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a {...props} />
          </Link>
        )}
      >
        <PrismicPreview repositoryName="spaceTraveling">
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </>
  );
}

export default MyApp;

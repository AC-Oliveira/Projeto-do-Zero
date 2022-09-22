import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FaCalendar, FaClock, FaUser } from 'react-icons/fa';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import data from './data.json';
import { calcPostInfo } from '../_utils';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post(): JSX.Element {
  const postDateInfo = calcPostInfo(data.first_publication_date);
  return (
    <>
      <Head>
        <title>{data.data.title}</title>
      </Head>
      <main className={commonStyles.container}>
        <header>
          <img src="/Logo.svg" alt="spaceTraveling Logo" />
        </header>
        <img
          src={data.data.banner.url}
          alt="Post Banner"
          className={styles.postBanner}
        />
        <article>
          <div>
            <strong>{data.data.title}</strong>
            <p>
              <FaCalendar />
              <time>{postDateInfo.formatedDate}</time>
              <FaUser />
              <span>{data.data.author}</span>
              <FaClock />
              <span>{postDateInfo.minutesAfterPost}</span>
            </p>
          </div>
          {data.data.content.map((postData) => (
            <div>
              <strong>{postData.heading}</strong>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(postData.body),
                }}
              />
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };

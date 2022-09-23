import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FaCalendar, FaClock, FaUser } from 'react-icons/fa';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { calcPostInfo, calcPostReadTime } from '../_utils';
import Header from '../../components/Header';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner?: {
      url: string;
    };
    image?: {
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

interface IPostProps {
  post: Post;
}

export default function Post({ post }: IPostProps): JSX.Element {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const postDateInfo = calcPostInfo(post.first_publication_date);
  const readTime = calcPostReadTime(post.data.content);
  return (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <div className={styles.container}>
        <Header />
        {/* <header className={styles.postHeader}>
          <img src="/Logo.svg" alt="spaceTraveling Logo" />
        </header> */}
        <img src={post.data?.banner?.url || post.data?.image?.url} alt="Post Banner" className={styles.postBanner} />
        <main>
          <article
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className={styles.title}>
              <strong>{post.data.title}</strong>
              <p className={commonStyles.postInfoContainer}>
                <FaCalendar />
                <time>{postDateInfo.formatedDate}</time>
                <FaUser />
                <span>{post.data.author}</span>
                <FaClock />
                <span>{`${readTime} min`}</span>
              </p>
            </div>
            {post.data.content.map((postData, index) => (
              <div className={styles.postContainer} key={post.data.content[index].heading}>
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
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');
  const dynamicPaths = posts.results.map((post) => ({ params: { slug: post.uid } }));

  return {
    paths: dynamicPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const { slug } = params;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const post = await prismic.getByUID('posts', slug);

  return {
    props: {
      post,
    },
  };
};

import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FaCalendar, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';

import styles from './home.module.scss';
import { dateFormat } from './_utils';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const { results, next_page } = postsPagination;
  const [posts, setPosts] = useState(results);

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className={commonStyles.container}>
        <div className={commonStyles.logoContainer}>
          <img src="/Logo.svg" alt="Spacetraveling Logo" />
        </div>
        {posts.map((post) => {
          return (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <a className={styles.postContainer}>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div className={commonStyles.postInfoContainer}>
                  <FaCalendar />
                  <time>{dateFormat(post.first_publication_date)}</time>
                  <FaUser />
                  <span>{post.data.author}</span>
                </div>
              </a>
            </Link>
          );
        })}
        {next_page && (
          <button
            type="button"
            onClick={async () => {
              const nextPosts = await fetch(next_page).then((r) => r.json());
              setPosts(nextPosts.results);
            }}
            className={styles.loadMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsPagination = await prismic.getByType('posts');

  return {
    props: {
      postsPagination,
    },
  };
};

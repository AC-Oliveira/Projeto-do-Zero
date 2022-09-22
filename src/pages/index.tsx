import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FaCalendar, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';

import styles from './home.module.scss';

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

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className={commonStyles.container}>
        <div className={styles.logoContainer}>
          <img src="/Logo.svg" alt="Spacetraveling Logo" />
        </div>
        <div className={styles.postContainer}>
          <strong>Como utilizar Hooks</strong>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam
          </p>
          <div className={styles.postInfoContainer}>
            <FaCalendar />
            <time>15 Mar 2021</time>
            <FaUser />
            <span>Allan Oliveira</span>
          </div>
        </div>
        <div className={styles.postContainer}>
          <strong>Como utilizar Hooks</strong>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam
          </p>
          <div className={styles.postInfoContainer}>
            <FaCalendar />
            <time>15 Mar 2021</time>
            <FaUser />
            <span>Allan Oliveira</span>
          </div>
        </div>
        <div className={styles.postContainer}>
          <strong>Como utilizar Hooks</strong>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam
          </p>
          <div className={styles.postInfoContainer}>
            <FaCalendar />
            <time>15 Mar 2021</time>
            <FaUser />
            <span>Allan Oliveira</span>
          </div>
        </div>
        <p className={styles.loadMorePosts}>Carregar mais arquivos</p>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

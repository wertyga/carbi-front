import Head from 'next/head';

export const Helmet = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description || title} />
  </Head>
);

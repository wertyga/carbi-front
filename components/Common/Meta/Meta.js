import Head from 'next/head';
import { withRouter } from 'next/router';

export const MetaComponent = ({ title, description, noindex, imageWidth, imageHeight, router, Image }) => {
  const { pathname } = router;
  return (
    title ?
      <Head>
        <title>{title}</title>
        <meta name="description" content={description || title} />
        {noindex && <meta name="robots" content="noindex, nofollow" />}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Интернет магазин Энергия - Ennergiia" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={pathname} />
        {description && <meta property="og:description" content={description} />}
        {Image && <meta property="og:image" content={Image} />}
        {imageWidth && <meta property="og:image:width" content={imageWidth} />}
        {imageHeight && <meta property="og:image:height" content={imageHeight} />}
      </Head> :
      null
  );
};

export const Meta = withRouter(MetaComponent);

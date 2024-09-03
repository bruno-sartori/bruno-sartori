import Head from "next/head";
import "../app/globals.css";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";

interface Props {
  title: string;
  description: string;
  image?: string;
  url: string;
  site: string;
  generator?: string;
}

const CustomHead = ({ title, description, image = "/blog-placeholder-1.jpg", url, site, generator }: Props) => {
  const canonicalURL = new URL(url, site).toString();

  return (
    <Head key={title}>
      {/* Global Metadata */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔬</text></svg>"
      />
      {generator && <meta name="generator" content={generator} />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalURL} />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default CustomHead;

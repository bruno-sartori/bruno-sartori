"use client";

// Importações
import { notFound } from 'next/navigation';
import Layout from '@/app/layout';
import Container from '@/components/Container';
import FormattedDate from '@/components/FormattedDate';
import BackToPrevious from '@/components/BackToPrevious';
import PostNavigation from '@/components/PostNavigation';
import TableOfContents from '@/components/TableOfContents';
import Giscus from '@/components/Giscus';
import { readingTime } from '@/utils';
import { getCollection } from '@/utils'; // Atualize o caminho conforme necessário
import { useEffect, useState } from 'react';
import { CollectionEntry, Heading } from '@/types';

// Função para buscar o post pelo slug
async function fetchPost(slug: string) {
  const posts = (await getCollection())
  //.filter((post) => !post.data.draft)
  .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());
  
  const post = posts.find((post) => {
    return post.slug === slug;
  });

  if (!post) {
    notFound();
  }
  return post;
}

// Função para buscar o próximo e o anterior post
async function fetchAdjacentPosts(slug: string) {
  const posts = (await getCollection())
  //.filter((post) => !post.data.draft)
  .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());
  const postIndex = posts.findIndex((post) => post.slug === slug);
  const result =  {
    prevPost: posts[postIndex - 1] || null,
    nextPost: posts[postIndex + 1] || null,
  };
  console.log(result)
  return result;
}

// Componente principal da página
// eslint-disable-next-line @next/next/no-async-client-component
const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  const [post, setPost] = useState<CollectionEntry<'blog'>>({
    title: '',
    pubDate: '',
    link: '',
    guid: '',
    author: '',
    thumbnail: '',
    description: '',
    enclosure: {},
    categories: [],
    headings: [],
    slug: ''
  });
  const [adjacentPosts, setAdjacentPosts] = useState<{ prevPost: any, nextPost: any}>({ prevPost: null, nextPost: null });

  useEffect(() => {
    const fetchData = async () => {
      const newPost = await fetchPost(params?.slug);
      const { prevPost, nextPost } = await fetchAdjacentPosts(params?.slug);

      setPost(newPost);
      setAdjacentPosts({ prevPost, nextPost });
    }

    fetchData();
  }, [params?.slug]);

  return (
    <Layout title={post.title} description={post.description}>
      <main>
        <Container>
          <div className="animate">
            <BackToPrevious href="/blog">Back to blog</BackToPrevious>
          </div>
          <div className="my-10 space-y-1">
            <div className="animate flex items-center gap-1.5">
              <div className="font-base text-sm">
                <FormattedDate date={post.pubDate ? new Date(post.pubDate) : new Date()} />
              </div>
              &bull;
              <div className="font-base text-sm">
                {readingTime(post.description)}
              </div>
            </div>
            <h1 className="animate text-3xl font-semibold text-black dark:text-white">
              {post.title}
            </h1>
          </div>
          <TableOfContents headings={post.headings} />
          <article className="animate">
            {post && <div dangerouslySetInnerHTML={{ __html: post.description }} />}
            <div className="mt-24">
              <PostNavigation prevPost={adjacentPosts.prevPost} nextPost={adjacentPosts.nextPost} />
            </div>
            <div className="mt-24">
              <Giscus />
            </div>
          </article>
        </Container>
      </main>
    </Layout>
  );
};

export default BlogPostPage;

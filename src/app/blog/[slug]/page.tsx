import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import FormattedDate from '@/components/FormattedDate';
import BackToPrevious from '@/components/BackToPrevious';
import PostNavigation from '@/components/PostNavigation';
import TableOfContents from '@/components/TableOfContents';
import { readingTime } from '@/utils';
import { getCollection } from '@/utils';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getCollection();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const getPostBySlug = async (slug: string) => {
  const posts = await getCollection();
  const post = posts.find((post) => {
    return post.slug === slug;
  });

  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post?.title || 'post',
    description: post?.description || '',
  };
}

// Função para buscar o próximo e o anterior post
async function fetchAdjacentPosts(slug: string) {
  const posts = await getCollection();
  const postIndex = posts.findIndex((post) => post.slug === slug);
  const result =  {
    prevPost: posts[postIndex - 1] || null,
    nextPost: posts[postIndex + 1] || null,
  };
  return result;
}

// Componente principal da página
const BlogPostPage = async ({ params }: Props) => {
  const post = await getPostBySlug(params?.slug);
  const { prevPost, nextPost } = await fetchAdjacentPosts(params?.slug);

  if (!post) {
    return notFound();
  }

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/blog">Back to blog</BackToPrevious>
      </div>
      <div className="my-10 space-y-1">
        <div className="animate flex items-center gap-1.5">
          <div className="font-base text-sm">
            <FormattedDate date={post.pubDate} />
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
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />
        </div>
      </article>
    </Container>
  );
};

export default BlogPostPage;

// app/blog/page.tsx
import Container from '@/components/Container';
import ArrowCard from '@/components/ArrowCard';
import { CollectionEntry } from '@/types';
import { getCollection } from '@/utils';
import { Metadata } from 'next';
import { BLOG } from '@/consts';

type Acc = {
  [year: string]: CollectionEntry<'blog'>[];
};

export function generateMetadata(): Metadata {
  return {
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
  };
}

async function fetchPosts() {
  const data: CollectionEntry<'blog'>[] = await getCollection();

  const posts = data.reduce<Acc>((acc, post) => {
    const year = new Date(post.pubDate).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(posts).sort((a, b) => parseInt(b) - parseInt(a));

  return { posts, years };
}

const BlogPage = async () => {
  const { posts, years } = await fetchPosts();

  return (
    <Container>
      <aside>
        <div className="space-y-10">
          <div className="space-y-4">
            {years.map((year) => (
              <section key={year} className="animate space-y-4">
                <div className="font-semibold text-black dark:text-white">
                  {year}
                </div>
                <div>
                  <ul className="not-prose flex flex-col gap-4">
                    {posts[year].map((post) => (
                      <li key={post.guid}>
                        <ArrowCard type='blog' entry={post} />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </aside>
    </Container>
  );
};

export default BlogPage;

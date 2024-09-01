// app/blog/page.tsx
import Layout from '@/app/layout';
import Container from '@/components/Container';
import ArrowCard from '@/components/ArrowCard';
import { BLOG } from '@/consts';
import { CollectionEntry } from '@/types';
import { getCollection } from '@/utils';


type Acc = {
  [year: string]: CollectionEntry<'blog'>[];
};

async function fetchPosts() {
  const data: CollectionEntry<'blog'>[] = (await getCollection())
    // .filter((post) => !post.data.draft)
    .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

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
    <Layout title={BLOG.TITLE} description={BLOG.DESCRIPTION}>
      <main>
        <Container>
          <aside data-pagefind-ignore>
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
      </main>
    </Layout>
  );
};

export default BlogPage;

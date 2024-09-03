import Container from '@/components/Container';
import { SITE, HOME, SOCIALS } from '@/consts';
import ArrowCard from '@/components/ArrowCard';
import Link from '@/components/Link';
import { Metadata } from 'next';
import { CollectionEntry } from '@/types';
import { getCollection, getProjects } from '@/utils';

// Definição do tipo dos dados
interface HomeProps {
  blog: CollectionEntry<'blog'>[];
  projects: CollectionEntry<'projects'>[];
}

// Função para obter dados diretamente no componente
async function fetchData(): Promise<HomeProps> {
  const blog: CollectionEntry<'blog'>[] = (await getCollection()).slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);
  const projects: CollectionEntry<'projects'>[] = (await getProjects()).slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);

  return {
    blog,
    projects,
  };
}

export function generateMetadata(): Metadata {
  return {
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
  };
}

// Componente principal
export default async function Home() {
  const { blog, projects } = await fetchData();

  return (
    <Container>
      <aside>
        <h1 className="animate font-semibold text-black dark:text-white">
          About Me
        </h1>
        <div className="space-y-16">
          <section>
            <article className="space-y-4">
              <span className="animate">
                <p>I am an experienced Front End Programmer with expertise in developing complex front-end solutions. I specialize in working with modern technologies such as ReactJS, React Native, NextJS, SASS, and TypeScript.</p>
                <p>My skills include the development of multi-tenant platforms, OTT applications, and Chromecast integration. I have successfully contributed to major projects involving significant platforms and technologies, including Samsung Tizen and LG WebOS.</p>
                <p>My professional background includes creating advanced features for video control, implementing analytics and tag management solutions, and optimizing SEO performance. I have a proven track record of achieving ambitious goals and enhancing user experiences through innovative web solutions.</p>
              </span>
              <span className="animate">
                <p>With over 8 years of experience in web development, I am proficient in various modern technologies and methodologies. My academic background includes a postgraduate degree in Internet of Things and a degree in Systems Analysis and Development.</p>
              </span>
            </article>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">Latest posts</h2>
              <Link href="/blog"> See all posts </Link>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {blog.map((post) => (
                <li key={post.guid}>
                  <ArrowCard type='blog' entry={post} />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">Recent projects</h2>
              <Link href="/projects"> See all projects </Link>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {projects.map((project) => (
                <li key={project.title}>
                  <ArrowCard type='projects' entry={project} />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-4">
            <h2 className="font-semibold text-black dark:text-white">Let&rsquo;s Connect</h2>
            <article>
              <p>
                If you want to get in touch with me about something or just to say hi, reach out on
                social media or send me an email.
              </p>
            </article>
            <ul className="not-prose flex flex-wrap gap-2">
              {SOCIALS.map((SOCIAL) => (
                <li className="flex gap-x-2 text-nowrap" key={SOCIAL.NAME}>
                  <Link href={SOCIAL.HREF} external aria-label={`${SITE.TITLE} on ${SOCIAL.NAME}`}>
                    {SOCIAL.NAME}
                  </Link>
                  {'/'}
                </li>
              ))}
              <li className="line-clamp-1">
                <Link href={`mailto:${SITE.EMAIL}`} aria-label={`Email ${SITE.TITLE}`}>
                  {SITE.EMAIL}
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </aside>
    </Container>
  );
}

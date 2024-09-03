// app/projects/[slug]/page.tsx
import { Metadata } from 'next';
import Container from '@/components/Container';
import FormattedDate from '@/components/FormattedDate';
import BackToPrevious from '@/components/BackToPrevious';
import Link from '@/components/Link';
import TableOfContents from '@/components/TableOfContents';
import { getProjects, readingTime } from '@/utils';
import Comments from '@/components/Comments';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

const getProjectBySlug = async (slug: string) => {
  const projects = await getProjects();
  const project = projects.find((project) => {
    return project.slug === slug;
  });
  return project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  return {
    title: project?.title || 'Project',
    description: project?.description || '',
  };
}

const ProjectPage = async ({ params }: Props) => {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/projects">Back to projects</BackToPrevious>
      </div>
      <div className="animate my-10 space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="font-base text-sm">
            <FormattedDate date={project.pubDate} />
          </div>
          &bull;
          <div className="font-base text-sm">{readingTime(project.description)}</div>
        </div>
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          {project.title}
        </h1>
        {(project.demoURL || project.repoURL) && (
          <nav className="flex gap-1">
            {project.demoURL && (
              <Link href={project.demoURL} external>
                demo
              </Link>
            )}
            {project.demoURL && project.repoURL && <span>/</span>}
            {project.repoURL && (
              <Link href={project.repoURL} external>
                repo
              </Link>
            )}
          </nav>
        )}
      </div>
      <TableOfContents headings={project.headings} />
      <article className="animate">
        {project && <div dangerouslySetInnerHTML={{ __html: project.readme}} />}
        <div className="mt-24">
          <Comments />
        </div>
      </article>
    </Container>
  );
};

export default ProjectPage;

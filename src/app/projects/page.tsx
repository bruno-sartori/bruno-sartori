import Container from '@/components/Container';
import ArrowCard from '@/components/ArrowCard';
import { getProjects } from '@/utils';
import { Metadata } from 'next';
import { PROJECTS } from '@/consts';

export function generateMetadata(): Metadata {
  return {
    title: PROJECTS.TITLE,
    description: PROJECTS.DESCRIPTION,
  };
}

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <Container>
      <aside>
        <div className="space-y-10">
          <div className="animate font-semibold text-black dark:text-white">
            Projects
          </div>
          <ul className="animate not-prose flex flex-col gap-4">
            {projects.map((project) => (
              <li key={project.pubDate.valueOf()}>
                <ArrowCard type='projects' entry={project} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </Container>
  );
};

export default ProjectsPage;

// app/projects/page.tsx
import Layout from '@/app/layout';
import Container from '@/components/Container';
import ArrowCard from '@/components/ArrowCard';
import { PROJECTS } from '@/consts';
import { getProjects } from '@/utils';

const ProjectsPage = async () => {
  const projects = (await getProjects())
    //.filter((project) => !project.data.draft)
    .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

  return (
    <Layout title={PROJECTS.TITLE} description={PROJECTS.DESCRIPTION}>
      <main>
        <Container>
          <aside data-pagefind-ignore>
            <div className="space-y-10">
              <div className="animate font-semibold text-black dark:text-white">
                Projects
              </div>
              <ul className="animate not-prose flex flex-col gap-4">
                {projects.map((project) => (
                  <li key={new Date(project.pubDate).valueOf()}>
                    <ArrowCard type='projects' entry={project} />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </main>
    </Layout>
  );
};

export default ProjectsPage;

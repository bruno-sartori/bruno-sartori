import { CollectionEntry, GithubRepo } from '@/types';
import { htmlToHeadings, logResponse } from '@/utils';
import { marked } from 'marked';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setup, setupCache } from 'axios-cache-adapter';
 
const api = setup({
  cache: setupCache({
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
});

type ResponseData = {
  data: Array<CollectionEntry<'projects'>>
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const config = {
      headers: {
        authentication: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    };

    const reposUrl = `https://api.github.com/users/bruno-sartori/repos?type=owner&sort=updated`;
    const response = await api.get<GithubRepo[]>(reposUrl, config);
    logResponse(response, reposUrl, 'GET');
    const data = response.data.filter(o => o.private === false && o.fork === false && o.name === 'weeb-logger');

    const resp: CollectionEntry<'projects'>[] = await Promise.all(data.map(async repo => {
      const repoDetailUrl = `${repo.url}/contents/README.md`;
      const repoDetail = await api.get<any>(repoDetailUrl, config);
      logResponse(repoDetail, repoDetailUrl, 'GET');

      let readme = '';
      if (repoDetail.data.content !== '') {
        const buff = Buffer.from(repoDetail.data.content, 'base64');
        readme = buff.toString('ascii');
        readme = await marked.parse(readme)
      }

      const project: CollectionEntry<'projects'> = {
        title: repo.name,
        description: repo.description,
        repoURL: repo.html_url,
        readme,
        author: repo.owner.login,
        categories: repo.topics,
        enclosure: '',
        guid: repo.full_name,
        headings: htmlToHeadings(readme),
        link: repo.html_url,
        pubDate: repo.updated_at,
        slug: repo.name,
        thumbnail: ''
      };

      return project;
    }));

    res.status(200).json({ data: resp })
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: [] });
  }
}

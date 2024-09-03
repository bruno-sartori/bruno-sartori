import { CollectionEntry, GithubRepo } from '@/types';
import { htmlToHeadings } from '@/utils';
import { marked } from 'marked';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidString } from '@/isValidVariable';

type ResponseData = {
  data: Array<CollectionEntry<'projects'>>
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const config: RequestInit = {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      cache: 'force-cache'
    };

    const reposUrl = `https://api.github.com/users/bruno-sartori/repos?type=owner&sort=updated`;
    const response = await fetch(reposUrl, config);

    if (!response.ok) {
      res.status(500).json({ data: [] });
    }

    let data: GithubRepo[] = await response.json();
    data = data.filter(o => o.private === false && o.fork === false);

    const resp: CollectionEntry<'projects'>[] = await Promise.all(data.map(async repo => {
      const repoDetailUrl = `${repo.url}/contents/README.md`;
      let repoDetail = {
        data: {},
        status: 0,
        statusText: '',
        config: {},
        headers: {},
        request: {},
        content: '',
      };

      try {
        const repoDetailResponse = await fetch(repoDetailUrl, config);
        repoDetail = await repoDetailResponse.json();
      } catch (error) {
        console.error(`1`, error)
      }

      let readme = '';
      if (isValidString(repoDetail?.content)) {
        const buff = Buffer.from(repoDetail.content, 'base64');
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
    console.error(`2`, error);
    res.status(500).json({ data: [] });
  }
}

import { CollectionEntry } from '@/types';
import { htmlToHeadings } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  data: Array<CollectionEntry<'blog'>>
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@brunosartori.dev`);
    
    if (!response.ok) {
      res.status(500).json({ data: [] });
    }
    
    const data = await response.json();
    
    data.items = await data.items.map((d: CollectionEntry<'blog'>) => {
      d.headings = htmlToHeadings(d.description);
      d.slug = d.link.replace(/(.*\/)*/,"").split('?')[0];
      return d;
    });
    
    res.status(200).json({ data: data.items })
  } catch (error) {
    res.status(500).json({ data: [] });
  }
}

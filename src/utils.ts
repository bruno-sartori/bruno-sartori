import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Heading, TApiMethods } from './types';
import { Parser, DomHandler } from 'htmlparser2';
import { AxiosResponse } from 'axios';

// Função para combinar classes com Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para formatar a data
export function formatDate(date: Date): string {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

// Função para calcular o tempo de leitura de um texto HTML
export function readingTime(html: string): string {
  const textOnly = html.replace(/<[^>]+>/g, '');
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export async function getCollection(): Promise<any[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/blog`);
    if (!response.ok) {
      throw new Error('Failed to fetch collection');
    }
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    return [];
  }
}

export async function getProjects(): Promise<any[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch collection');
    }
    const payload = await response.json();

    return payload.data;
  } catch (error) {
    return [];
  }
}

export const logResponse = (response: AxiosResponse<any>, url: string, method: TApiMethods) => {
  if (response?.request?.fromCache) {
    console.log(`CACHED ${method}`, url);
  } else {
    console.log(method, url);
  }
}
  
export function htmlToHeadings(html: string): Heading[] {
    // Function to generate a slug from the heading text
    const generateSlug = (text: string): string => 
      text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    // Create a handler to process the HTML
    const handler = new DomHandler((error, dom) => {
        if (error) {
            throw error;
        }
    });
  
    // Create a parser with the handler
    const parser = new Parser(handler);
    parser.write(html);
    parser.end();
  
    // Extract headings from the parsed DOM
    const extractHeadings = (nodes: any[]): Heading[] => {
        return nodes.reduce((acc: Heading[], node: any) => {
            if (node.type === 'tag' && /^h[1-6]$/.test(node.name)) {
                const level = parseInt(node.name[1], 10) - 1;
                acc.push({
                    depth: level, // Use the actual heading level directly
                    slug: generateSlug(node.children.map((child: any) => child.data || '').join('')),
                    text: node.children.map((child: any) => child.data || '').join(''),
                });
            }
            if (node.children) {
                acc.push(...extractHeadings(node.children));
            }
            return acc;
        }, []);
    };
  
    // Find all heading elements and extract headings
    const dom = handler.dom;
    const headings = extractHeadings(dom);
  
    return headings;
}

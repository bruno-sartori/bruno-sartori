import React from 'react';
import TableOfContentsHeading from './TableOfContentsHeading';

interface Heading {
  depth: number;
  slug: string;
  text: string;
  subheadings?: Heading[];
}

interface Props {
  headings: Heading[];
}

const buildToc = (headings: Heading[]): Heading[] => {
  const toc: Heading[] = [];
  const parentHeadings = new Map<number, Heading>();

  headings.forEach((h) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1)?.subheadings?.push(heading);
    }
  });

  return toc;
};

const TableOfContents: React.FC<Props> = ({ headings }) => {
  const toc = buildToc(headings);

  return (
    <details open className="animate rounded-lg border border-black/15 dark:border-white/20">
      <summary className="cursor-pointer rounded-t-lg px-3 py-1.5 font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5">
        Table of Contents
      </summary>
      <nav>
        <ul className="py-3">
          {toc.map((heading) => (
            <TableOfContentsHeading key={heading.slug} heading={heading} />
          ))}
        </ul>
      </nav>
    </details>
  );
};

export default TableOfContents;

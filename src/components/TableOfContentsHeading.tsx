import React from 'react';
import Link from './Link';

export interface Heading {
  depth: number;
  slug: string;
  text: string;
  subheadings?: Heading[];
}

interface Props {
  heading: Heading;
}

const TableOfContentsHeading: React.FC<Props> = ({ heading }) => {
  return (
    <li className="list-inside list-disc px-6 py-1.5 text-sm">
      <Link href={`#${heading.slug}`} underline>
        {heading.text}
      </Link>
      {heading.subheadings && heading.subheadings.length > 0 && (
        <ul className="translate-x-3">
          {heading.subheadings.map((subheading) => (
            <TableOfContentsHeading key={subheading.slug} heading={subheading} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TableOfContentsHeading;

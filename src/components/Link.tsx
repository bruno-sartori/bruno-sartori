import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils';

type Props = {
  href: string;
  external?: boolean;
  underline?: boolean;
  group?: boolean;
  [key: string]: any; // Para suportar propriedades adicionais
};

const CustomLink: React.FC<Props> = ({
  href,
  external = false,
  underline = true,
  group = false,
  ...rest
}) => {
  if (external) {
    // Para links externos, ainda usamos <a> diretamente com `rel` para segurança
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-block decoration-black/30 dark:decoration-white/30 hover:decoration-black/50 focus-visible:decoration-black/50 dark:hover:decoration-white/50 dark:focus-visible:decoration-white/50 text-current hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white transition-colors duration-300 ease-in-out",
          underline && "underline underline-offset-[3px]",
          group && "group"
        )}
        {...rest}
      >
        {/* Em React, usamos children para representar o conteúdo interno */}
        {rest.children}
      </a>
    );
  }

  return (
    <Link 
        href={href}
        className={cn(
            "inline-block decoration-black/30 dark:decoration-white/30 hover:decoration-black/50 focus-visible:decoration-black/50 dark:hover:decoration-white/50 dark:focus-visible:decoration-white/50 text-current hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white transition-colors duration-300 ease-in-out",
            underline && "underline underline-offset-[3px]",
            group && "group"
        )}
        {...rest}
        >
        {rest.children}
    </Link>
  );
};

export default CustomLink;

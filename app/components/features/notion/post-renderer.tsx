import type { ComponentProps } from 'react';
import clsx from 'clsx';
import { lazy } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { NavLink } from 'react-router';

const Code = import('react-notion-x/build/third-party/code').then(m => ({ default: m.Code }));

const Collection = lazy(() => import('react-notion-x/build/third-party/collection').then(r => ({ default: r.Collection })));

const components = {
  Code,
  Collection,
  Link: NavLink,
};

const mapPageUrl = (pageId: string) => `/blog/${pageId}`;

export function PostRenderer({ ...props }: ComponentProps<typeof NotionRenderer>) {
  const { className, ...restProps } = props;
  return (
    <NotionRenderer
      bodyClassName={clsx(className)}
      mapPageUrl={mapPageUrl}
      components={components}
      {...restProps}
    />
  );
}

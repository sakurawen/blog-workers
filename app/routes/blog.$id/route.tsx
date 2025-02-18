import type { ExtendedRecordMap } from 'notion-types';
import type { MetaFunction } from 'react-router';
import type { Route } from './+types/route';
import { getPageTitle } from 'notion-utils';
import { Suspense } from 'react';
import { useLoaderData } from 'react-router';
import { PostLoader } from '~/components/features/notion/post-loader';
import { PostRenderer } from '~/components/features/notion/post-renderer';
import { PageContainer } from '~/components/ui/page-container';
import { PostHeader } from './_components/post-header';

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  const res = await fetch(`https://api.akumanoko.com/blog/${id}`);
  return await res.json();
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = getPageTitle(data as ExtendedRecordMap);
  return [{
    title: `${title}- akumanoko`,
  }];
};

export default function Post() {
  return (
    <PageContainer className="pt-12  px-4 max-w-2xl mx-auto">
      <PostHeader />
      <Suspense fallback={<PostLoader />}>
        <PostContent />
      </Suspense>
    </PageContainer>
  );
}

function PostContent() {
  const data = useLoaderData() as ExtendedRecordMap;
  return (
    <PostRenderer
      recordMap={data}
      fullPage
      disableHeader
      className="!w-full  px-0!"
    />
  );
}

import type { ExtendedRecordMap } from 'notion-types';
import type { Route } from './+types/route';
import { Icon } from '@iconify/react';
import { Suspense } from 'react';
import { Await, Link, useAsyncValue } from 'react-router';
import { PostListLoader } from '~/components/features/notion/post-loader';
import { PostRenderer } from '~/components/features/notion/post-renderer';
import { Button } from '~/components/ui/button';
import { PageContainer } from '~/components/ui/page-container';

export async function loader() {
  const postListFetcher = new Promise((resolve, reject) => {
    fetch('https://api.akumanoko.com/blog').then((res) => {
      resolve(res.json());
    }).catch(reject);
  });
  return {
    postListFetcher,
  };
}

export default function BlogPostList({ loaderData }: Route.ComponentProps) {
  return (
    <PageContainer className="pt-12  pb-8 max-w-2xl mx-auto">
      <div className="px-4 mb-8">
        <Link to="/">
          <Button className="px-6 py-2 rounded-full text-xl ">
            <Icon icon="ri:arrow-left-line" />
          </Button>
        </Link>
      </div>
      <Suspense fallback={<PostListLoader />}>
        <Await resolve={loaderData.postListFetcher}>
          <PostList />
        </Await>
      </Suspense>
    </PageContainer>
  );
}

function PostList() {
  const data = useAsyncValue() as ExtendedRecordMap;
  return <PostRenderer className="!w-auto" recordMap={data} />;
}

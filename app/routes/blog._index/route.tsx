import type { ExtendedRecordMap } from 'notion-types';
import { Icon } from '@iconify/react';
import { Suspense, use } from 'react';
import { Link, useLoaderData } from 'react-router';
import { PostListLoader } from '~/components/features/notion/post-loader';
import { PostRenderer } from '~/components/features/notion/post-renderer';
import { Button } from '~/components/ui/button';
import { PageContainer } from '~/components/ui/page-container';
import { request } from '~/lib/request';

export async function loader() {
  const fetcher = request.get<ExtendedRecordMap>('blog').json();
  return {
    fetcher,
  };
}

export default function BlogPostList() {
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
        <PostList />
      </Suspense>
    </PageContainer>
  );
}

function PostList() {
  const { fetcher } = useLoaderData<typeof loader>();
  const data = use<ExtendedRecordMap>(fetcher);
  return <PostRenderer className="!w-auto" recordMap={data} />;
}

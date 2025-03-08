import type { ExtendedRecordMap } from 'notion-types';
import type { Route } from './+types/route';
import { getPageTitle } from 'notion-utils';
import { Suspense, use } from 'react';
import { useLoaderData } from 'react-router';
import { Comments } from '~/components/features/comments';
import { PostLoader } from '~/components/features/notion/post-loader';
import { PostRenderer } from '~/components/features/notion/post-renderer';
import { PageContainer } from '~/components/ui/page-container';
import { request } from '~/lib/request';
import { PostHeader } from './_components/post-header';

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  async function fetch() {
    const data = await request.get<ExtendedRecordMap>(`blog/${id}`).json();
    const title = getPageTitle(data);
    return {
      data,
      title,
    };
  }
  return {
    fetcher: fetch(),
  };
}

export default function Post({ params }: Route.ComponentProps) {
  return (
    <PageContainer className='pt-12  px-4 max-w-2xl mx-auto'>
      <PostHeader />
      <Suspense fallback={<PostLoader />}>
        <PostContent id={params.id} />
      </Suspense>
    </PageContainer>
  );
}

function PostContent({ id }: { id: string }) {
  const { fetcher } = useLoaderData<typeof loader>();
  const { data, title } = use(fetcher);
  return (
    <>
      <title>
        {`${title} - akumanoko`}
      </title>
      <PostRenderer
        footer={
          <Comments id={id} />
        }
        recordMap={data as ExtendedRecordMap}
        fullPage
        disableHeader
        className='!w-full  px-0! pb-0!'
      />
    </>
  );
}

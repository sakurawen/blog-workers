import type { Comment } from './comments-type.ts';
import useSWR from 'swr';
import { request } from '~/lib/request';
import { CommentsInput } from './comments-input';
import { CommentsList } from './comments-list';
import { CommentsSignInMask } from './comments-sign-in-mask';

interface CommentsProps {
  id: string
}

function getCommentsList(id: string) {
  return request.get<Comment[]>(`comments/${id}`).json();
}

export function Comments(props: CommentsProps) {
  const { id } = props;
  const { data, isLoading } = useSWR(id, getCommentsList);
  if (isLoading) {
    return null;
  }
  return (
    <div className='comment w-full pb-24'>
      <CommentsList list={data || []} />
      <CommentsSignInMask>
        <CommentsInput id={id} />
      </CommentsSignInMask>
    </div>
  );
}

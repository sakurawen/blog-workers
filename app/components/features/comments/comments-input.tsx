import type { Comment } from './comments-type.ts';
import { Icon } from '@iconify/react';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { auth } from '~/lib/auth';
import { queryClient } from '~/lib/query.js';
import { request } from '~/lib/request.js';

interface CommentsInputProps {
  id: string
}
export function CommentsInput({ id }: CommentsInputProps) {
  const { data } = auth.useSession();
  const [state, action, isPending] = useActionState(async (_: any, form: FormData) => {
    const comment = form.get('comment') as string;
    if (comment.trim().length === 0) {
      toast.info('请输入评论');
      return {
        comment,
      };
    }
    if (!data?.user) {
      toast.info('请登陆后评论');
      return {
        comment: '',
      };
    }
    const create: Comment = {
      postId: id,
      userId: data.user.id,
      content: comment,
    };
    try {
      await request.post('comments', {
        body: JSON.stringify(create),
        headers: {
          'content-type': 'application/json',
        },
      });
      toast.success('评论成功');
      return {
        comment: '',
      };
    }
    catch (e) {
      console.error(e);
      toast.error('评论失败');
      return {
        comment,
      };
    }
    finally {
      queryClient.invalidateQueries({
        queryKey: ['comments', id],
      });
    }
  }, { comment: '' });

  return (
    <div className="comment-input rounded-xl">
      <div className="pt-4 relative">
        <form action={action}>
          <Textarea name="comment" defaultValue={state.comment} disabled={isPending} className="block w-full py-2.5 resize-none" rows={8} placeholder="评论文章是免费的..." />
          <div className="comment-actions absolute right-1.5 bottom-1.5">
            <Button variant="ghost" type="submit" disabled={isPending}>
              <Icon icon="lucide:send" className="mr-1" />
              提 交
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

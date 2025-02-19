import type { InferUserFromClient } from 'better-auth';

export interface Comment {
  id?: number | undefined
  userId?: string | null | undefined
  postId?: string | null | undefined
  parentId?: number | null | undefined
  createAt?: Date | null | undefined
  content?: string | null | undefined
  user?: InferUserFromClient<any> | null | undefined
}

import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import PostControls from '@/src/components/post-controls';
import PostCommentsList from '@/src/components/post-comments-list';
import db from '@/src/lib/firebase';
import type { Post } from '@/src/lib/types';
import { formatDate } from '@/src/lib/utils';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/src/components/ui/card';

export const dynamic = 'force-dynamic'; // SSR: always run on the server

const fetchPost = async (postId: string) => {
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  return {
    id: postSnap.id,
    ...postSnap.data(),
  } as Post;
};

export default async function PostPage({ params }: any) {
  const post = await fetchPost(params.id);
  return (
    <div className="container mx-auto">
      <div className="grid gap-6 grid-cols-1 pt-10">
        <Card key={post.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
            <CardDescription>{formatDate(post.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex gap-2">
              <div>Author:</div>
              <p className="line-clamp-3">{post.author}</p>
            </div>
          </CardContent>
          <CardContent className="flex-grow">
            <p className="line-clamp-3">{post.content}</p>
          </CardContent>
          <PostCommentsList post={post} />
          <CardFooter>
            <PostControls postId={post.id} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

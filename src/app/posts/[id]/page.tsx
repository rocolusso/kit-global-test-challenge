import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import PostControls from '@/src/components/post-controls';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '../../../components/ui/card';
import { formatDate } from '../../../lib/utils';

import type { Post } from '../../../components/post-list';
import { db } from '../../../lib/firebase';

const fetchPost = async (postId: string) => {
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  return {
    id: postSnap.id,
    ...postSnap.data(),
  } as Post;
};

export default async function PostPage({ params }: any) {
  // const [isCommiting, setIsCommiting] = React.useState(false);
  // const [isEditing, setIsEditing] = React.useState(false);

  const post = await fetchPost(params.id);

  // const commitPost = () => {
  //   setIsCommiting(true);
  // };

  return (
    <div className="container mx-auto">
      <div className="grid gap-6 grid-cols-1 pt-10">
        <Card key={post.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
            <CardDescription>{formatDate(post.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="line-clamp-3">{post.content}</p>
          </CardContent>
          <CardFooter>
            <PostControls />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '../../../components/ui/card';
import { formatDate } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import type { Post } from '../../../components/post-list';
import { db } from '../../../lib/firebase';
import { Input } from '../../../components/ui/input';

const fetchPost = async (postId: string) => {
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    return {
      id: postSnap.id,
      ...postSnap.data(),
    } as Post;
  }
  return null;
};

export default function PostPage({ params }: any) {
  const [post, setPost] = React.useState<Post | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isCommiting, setIsCommiting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPost(params.id);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

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
            {
              !isEditing && !isCommiting && (
              <>
                <Button variant="outline" onClick={() => setIsCommiting(true)}>Make Comment</Button>
                <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Post</Button>
              </>
              )
             }
            {
              isCommiting && (
              <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-2">
                <Input placeholder="Add a comment..." />
                <Button variant="outline">Comment post</Button>
              </div>
              )
             }
            {
                isEditing && (
                <div className="">
                  Post Editing FORM
                </div>
                )
             }
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

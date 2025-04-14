'use client';

import React, { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import Input from '@/src/components/ui/input';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Post } from '@/src/lib/types';
import { useRouter } from 'next/navigation';
import PostEditForm from '@/src/components/post-edit-form';
import RedirectButton from '@/src/components/redirect-button';
import db from '@/src/lib/firebase';

type Props = {
  postId: string;
};

const handlePostUpdate = async (post: Post | null, postId: string, comment:string) => {
  if (!post || !postId) return;

  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      ...post,
      comments: [...(post.comments ?? []), comment],
    });
  } catch (error) {
    console.error('Error updating post:', error);
  }
};

function PostControls({ postId }: Props) {
  const [post, setPost] = useState<Post | null>(null);
  const [isCommenting, setIsCommenting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'posts', postId);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          setPost(postSnap.data() as Post);
        } else {
          console.log('No such post!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const commentPost = async () => {
    if (!comment.trim()) return;

    try {
      await handlePostUpdate(post, postId, comment);
      setComment('');
      router.refresh();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <>
      {
            !isEditing && !isCommenting && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsCommenting(true)}>Make Comment</Button>
              <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Post</Button>
              <RedirectButton
                className=""
                targetUrl="/posts/"
                variant="default"
                btnText="Back to posts"
              />
            </div>
            )
        }
      {isCommenting && (
      <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-2 w-full">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button variant="default" onClick={() => commentPost()}>Comment post</Button>
      </div>
      )}
      {
            isEditing && (
            <div className="">
              <PostEditForm
                post={post}
                postId={postId}
                setIsEditing={setIsEditing}
              />
            </div>
            )
        }
    </>
  );
}

export default PostControls;

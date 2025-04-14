import React from 'react';
import PostsFiltering from '@/src/components/posts-filtering-service';

import fetchPosts from '@/src/lib/post/fetchPosts';

export const dynamic = 'force-dynamic';
export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};
export type Post = {
  author:string,
  comments: Comment[],
  content: string,
  createdAt: string,
  id: string
  title: string
}
export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto flex justify-center">
      <div className="pt-10">
        <PostsFiltering initialPosts={posts} />
      </div>
    </div>
  );
}

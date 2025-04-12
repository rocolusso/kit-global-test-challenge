import React from 'react';
import PostList from '../../components/post-list';

export const dynamic = 'force-dynamic'; // SSR: always run on the server
export default function Posts() {
  return (
    <div className="container mx-auto flex justify-center ">
      <div className="pt-10">
        <PostList />
      </div>
    </div>
  );
}

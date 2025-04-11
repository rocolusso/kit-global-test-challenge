import React from 'react';
import PostForm from '../components/post-form';

export default function Home() {
  return (
    <div className="container mx-auto flex justify-center ">
      <div className="pt-10">
        <PostForm />
      </div>
    </div>
  );
}

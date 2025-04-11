import React from 'react';

import { collection, getDocs } from 'firebase/firestore';
import ForClientButton from '@/src/components/forClient-button';
import { db } from '../lib/firebase';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from './ui/card';

import { formatDate } from '../lib/utils';

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

const fetchPosts = async () => {
  const postsCollection = collection(db, 'posts');
  const postsSnapshot = await getDocs(postsCollection);

  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return postsList;
};

export default async function PostList() {
  const posts = await fetchPosts();

  return (
    <div className="grid gap-6 p-5 sm:p-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {posts.map((post) => (
        <Card key={post.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
            <CardDescription>{formatDate(post.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="line-clamp-3">{post.content}</p>
          </CardContent>
          <CardFooter>
            <ForClientButton
              className=""
              targetUrl={`/posts/${post.id}`}
              variant="default"
              btnText="Read More"
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

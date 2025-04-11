'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { AlertCircle } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase';
import { Alert, AlertTitle } from './ui/alert';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from './ui/form';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from './ui/card';
import { Button } from './ui/button';

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

const postSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  author: z.string().min(3, { message: 'Author name must be at least 3 characters' }),
});

type PostFormValues = z.infer<typeof postSchema>

const createPost = async (postData: Omit<Post, 'id'>): Promise<Post | null> => {
  try {
    const postsCollection = collection(db, 'posts');
    const docRef = await addDoc(postsCollection, {
      ...postData,
      comments: postData.comments || [],
    });
    return {
      id: docRef.id,
      ...postData,
    };
  } catch (error: any) {
    console.error('Error creating post:', error);
    return null;
  }
};

export default function PostForm() {
  const router = useRouter();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: PostFormValues) => {
    try {
      setIsLoading(true);

      const newPost: Omit<Post, 'id'> = {
        title: data.title,
        content: data.content,
        author: data.author,
        createdAt: new Date().toISOString(),
        comments: [],
      };

      await createPost(newPost);
      router.push('/posts');
    } catch (err: any) {
      setIsError(true);
      console.error('Error in form submission:', err);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <div className="">
      <Card style={{
        maxWidth: '400px',
        padding: '20px',
      }}
      >
        <CardHeader style={{
          textAlign: 'center',
        }}
        >
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Fill out the form below to create a new blog post</CardDescription>
        </CardHeader>
        <CardContent style={{
          maxWidth: '350px',
          margin: '0 auto',
        }}
        >
          {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
          </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          padding: '10px',
                        }}
                        placeholder="Enter post title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>The title of your blog post.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          padding: '10px',
                        }}
                        placeholder="Your name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your name as the author of this post.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{
                          padding: '10px',
                          height: '150px',
                        }}
                        placeholder="Write your post content here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>The main content of your blog post.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Post'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

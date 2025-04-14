'use client';

import React, { useState, useEffect } from 'react';

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/src/components/ui/card';
import { Alert, AlertTitle } from '@/src/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import Input from '@/src/components/ui/input';
import Textarea from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '@/src/lib/firebase';

export type Comment = {
    id: string
    author: string
    content: string
    createdAt: string
}
export type Post = {
    author: string
    comments: Comment[]
    content: string
    createdAt: string
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

function PostEditForm({ post, postId, setIsEditing }: {
    post: Post|null,
    postId:string
    setIsEditing:React.Dispatch<React.SetStateAction<boolean>>

}) {
  console.log(postId, 'PostEditForm ID');
  const router = useRouter();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
        author: post.author,
      });
    }
  }, [post, form]);

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async () => {
    try {
      setIsSaving(true);
      setIsError(false);

      const handlePostUpdate = async (postData: Post | null, postID: string) => {
        if (!post || !postId) return;

        try {
          const postRef = doc(db, 'posts', postID);
          await updateDoc(postRef, {
            ...postData,
            title: form.getValues('title'),
            content: form.getValues('content'),
            author: form.getValues('author'),
          });
        } catch (error) {
          console.error('Error updating post:', error);
        }
      };

      await handlePostUpdate(post, postId);
    } catch (err: any) {
      setIsError(true);
      console.error('Error updating post:', err);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
      router.refresh();
    }
  };

  const deletePost = async (postIDid:string) => {
    if (!postId) return;

    try {
      const postRef = doc(db, 'posts', postIDid);
      await deleteDoc(postRef);
      console.log(`Post with ID ${postIDid} successfully deleted.`);
    } finally {
      router.push('/posts');
    }
  };

  return (
    <div className="min-w-[100vw] sm:min-w-[30vw] p-5">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Edit Post</CardTitle>
          <CardDescription>Edit fields form to edit blog post</CardDescription>
        </CardHeader>
        <CardContent className="mx-auto">
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
                      <Input className="p-2" placeholder="Enter post title" {...field} />
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
                      <Input className="p-2" placeholder="Your name" {...field} />
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
                        placeholder="Write your post content here..."
                        className="p-2 min-h-[200px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>The main content of your blog post.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Post'}
              </Button>
              <Button
                type="button"
                className="bg-red-500"
                onClick={() => deletePost(postId)}
              >
                Delete Post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostEditForm;

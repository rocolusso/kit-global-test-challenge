'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/src/components/ui/shad-cn/components/ui/card';
import Label from '@/src/components/ui/shad-cn/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/shad-cn/components/ui/select';
import Input from '@/src/components/ui/shad-cn/components/ui/input';
import { Button } from '@/src/components/ui/shad-cn/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Post } from '@/src/lib/types';
import RedirectButton from '@/src/components/redirect-button';

const filterPosts = (posts: Post[], searchParams: URLSearchParams) => {
  const author = searchParams.get('author');
  const title = searchParams.get('title');
  const hasComments = searchParams.get('hasComments');
  const commentAuthor = searchParams.get('commentAuthor');
  const minComments = searchParams.get('minComments');
  const createdAfter = searchParams.get('createdAfter');

  return posts.filter((post) => {
    if (author && post.author !== author) return false;
    if (title && !post.title.toLowerCase().includes(title.toLowerCase())) return false;
    if (hasComments === 'true' && post.comments.length === 0) return false;
    if (hasComments === 'false' && post.comments.length > 0) return false;
    if (commentAuthor && !post.comments.some((c) => c.author === commentAuthor)) return false;
    if (minComments && post.comments.length < Number.parseInt(minComments, 10)) return false;
    if (createdAfter && new Date(post.createdAt) < new Date(createdAfter)) return false;
    return true;
  });
};

function PostsFilteringControls(
  { initialPosts }: { initialPosts: Post[] },
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [form, setForm] = useState({
    author: searchParams.get('author') || '',
    title: searchParams.get('title') || '',
    commentAuthor: searchParams.get('commentAuthor') || '',
    hasComments: searchParams.get('hasComments') || '',
    minComments: searchParams.get('minComments') || '',
    createdAfter: searchParams.get('createdAfter') || '',
  });

  useEffect(() => {
    setForm({
      author: searchParams.get('author') || '',
      title: searchParams.get('title') || '',
      commentAuthor: searchParams.get('commentAuthor') || '',
      hasComments: searchParams.get('hasComments') || '',
      minComments: searchParams.get('minComments') || '',
      createdAfter: searchParams.get('createdAfter') || '',
    });
  }, [searchParams]);

  const filteredPosts = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    return filterPosts(initialPosts, params);
  }, [initialPosts, searchParams]);

  const handleInputChange = (e:React.BaseSyntheticEvent) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });

    router.push(`${pathname}?${query.toString()}`);
  };

  const handleReset = () => {
    setForm({
      author: '',
      title: '',
      commentAuthor: '',
      hasComments: '',
      minComments: '',
      createdAfter: '',
    });
    router.push(pathname);
  };

  const uniqueCommentAuthors = Array.from(
    new Set(initialPosts.flatMap(
      (post) => post.comments.map(
        (comment) => comment.author,
      ),
    ).filter(Boolean)),
  );
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Filter Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Search by title"
                  value={form.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commentAuthor">Comment Author</Label>
                <Select
                  value={form.commentAuthor}
                  onValueChange={(value) => handleSelectChange('commentAuthor', value)}
                >
                  <SelectTrigger id="commentAuthor">
                    <SelectValue placeholder="Select comment author" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Comment Authors</SelectItem>
                    {uniqueCommentAuthors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hasComments">Has Comments</Label>
                <Select
                  value={form.hasComments}
                  onValueChange={(value) => handleSelectChange('hasComments', value)}
                >
                  <SelectTrigger id="hasComments">
                    <SelectValue placeholder="Has comments?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minComments">Min. Comments</Label>
                <Input
                  id="minComments"
                  name="minComments"
                  type="number"
                  placeholder="Minimum comments"
                  value={form.minComments}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdAfter">Created After</Label>
                <Input
                  id="createdAfter"
                  name="createdAfter"
                  type="date"
                  value={form.createdAfter}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleReset} className="w-full sm:w-auto">
                Reset Filters
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Apply Filters
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div>
        <ul className="space-y-2">
          {filteredPosts.map((post) => (
            <li key={post.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <p className="text-sm text-gray-500">
                By
                {post.author}
                {' '}
                on
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                {post.comments.length}
                {' '}
                comments
              </p>
              <RedirectButton
                className=""
                targetUrl={`/posts/${post.id}`}
                variant="default"
                btnText="Read More"
              />
            </li>
          ))}
        </ul>
      </div>
    </>

  );
}

export default PostsFilteringControls;

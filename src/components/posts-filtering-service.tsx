import React from 'react';
import { CalendarIcon, MessageCircle, User } from 'lucide-react';
import RedirectButton from '@/src/components/redirect-button';
import type { Post } from '@/src/lib/types';

import {
  Card, CardContent, CardHeader, CardTitle, CardFooter,
} from '@/src/components/ui/shad-cn/components/ui/card';
import { Badge } from '@/src/components/ui/shad-cn/components/ui/badge';
import PostsFilteringControls from '@/src/components/posts-filtering-controls';

interface PostsFilterProps {
  initialPosts: Post[];
}

export default function PostsFilter({ initialPosts }: PostsFilterProps) {
  return (
    <>
      <PostsFilteringControls initialPosts={initialPosts} />
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Results</h2>
            <Badge variant="outline" className="text-sm">
              {initialPosts.length}
              {' '}
              posts found
            </Badge>
          </div>

          {initialPosts.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No posts match your current filters.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialPosts.map((post) => (
                <React.Fragment key={post.id}>
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <Badge variant="secondary">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {post.comments.length}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3
                        text-sm"
                      >
                        {post.content}
                      </p>
                    </CardContent>
                    {post.comments.length > 0 && (
                      <CardFooter className="flex-col items-start border-t pt-4">
                        <p className="text-xs font-medium mb-2">Recent Comments:</p>
                        <div className="space-y-2 w-full">
                          {post.comments.slice(0, 2).map((comment) => (
                            <CardContent key={Math.random()} className="bg-muted p-2 rounded-md text-xs">
                              <div className="font-medium">{comment.author}</div>
                              <p className="line-clamp-1">{comment.content}</p>
                            </CardContent>
                          ))}
                          {post.comments.length > 2 && (
                          <p className="text-xs text-muted-foreground text-right">
                            +
                            {post.comments.length - 2}
                            {' '}
                            more comments
                          </p>
                          )}
                        </div>

                      </CardFooter>
                    )}
                    <CardFooter className="flex-col items-start border-t pt-4">
                      <RedirectButton
                        className=""
                        targetUrl={`/posts/${post.id}`}
                        variant="default"
                        btnText="Read More"
                      />
                    </CardFooter>
                  </Card>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </>

  );
}

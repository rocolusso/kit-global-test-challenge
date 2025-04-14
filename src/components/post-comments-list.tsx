import React from 'react';
import { Card, CardContent, CardTitle } from '@/src/components/ui/card';
import type { Post } from '@/src/lib/types';

function PostCommentsList({ post }:{post:Post}) {
  return (
    <Card>
      {
          post.comments.length > 0 && (
          <CardContent className="flex-grow">
            <CardTitle className="line-clamp-1">Comments</CardTitle>
            <div className="list pt-5 max-w-fit">
              {post.comments.length && (
              <ul className="flex flex-col gap-5">
                {
                  post.comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                  ))
                }
              </ul>
              )}
            </div>
          </CardContent>
          )
      }
    </Card>

  );
}

export default PostCommentsList;

import React from 'react';
import { CardContent, CardTitle } from '@/src/components/ui/card';
import type { Post } from './post-list';

function PostCommentsList({ postData }:{postData:Post}) {
  return (
    <div>
      {
          postData.comments.length > 0 && (
          <CardContent className="flex-grow">
            <CardTitle className="line-clamp-1">Comments</CardTitle>
            <div className="list pt-5 max-w-fit">
              {postData.comments.length && (
              <ul className="flex flex-col gap-5">
                {
                          postData.comments.map((comment) => (
                            // @ts-ignore todo fixed this type error
                            <li key={comment.id}>{comment}</li>
                          ))
                        }
              </ul>
              )}
            </div>
          </CardContent>
          )
      }
    </div>

  );
}

export default PostCommentsList;

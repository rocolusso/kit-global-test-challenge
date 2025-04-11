'use client';

import React from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

function PostControls() {
  const [isCommiting, setIsCommiting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <>
      {
            !isEditing && !isCommiting && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsCommiting(true)}>Make Comment</Button>
              <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Post</Button>
            </div>
            )
        }
      {
            isCommiting && (
            <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-2">
              <Input placeholder="Add a comment..." />
              <Button variant="outline">Comment post</Button>
            </div>
            )
        }
      {
            isEditing && (
            <div className="">
              Post Editing FORM
            </div>
            )
        }
    </>
  );
}

export default PostControls;

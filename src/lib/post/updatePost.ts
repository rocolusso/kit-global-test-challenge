import { Post } from '@/src/lib/types';
import { doc, updateDoc } from 'firebase/firestore';
import db from '@/src/lib/firebase';
import { UseFormReturn } from 'react-hook-form';

const handlePostUpdate = async (
  post: Post | null,
  postId: string,
  postProp?: string | UseFormReturn<{
      author: string, content: string, title: string },
      any, { author: string, content: string, title: string }>,
) => {
  if (!post || !postId) return;

  try {
    const postRef = doc(db, 'posts', postId);
    if (typeof postProp === 'string') {
      await updateDoc(postRef, {
        ...post,
        comments: [...(post.comments ?? []), postProp],
      });
    } else if (postProp) {
      await updateDoc(postRef, {
        ...post,
        title: postProp.getValues('title'),
        content: postProp.getValues('content'),
        author: postProp.getValues('author'),
      });
    }
  } catch (error) {
    console.error('Error updating post:', error);
  }
};
export default handlePostUpdate;

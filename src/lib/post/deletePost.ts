import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { doc, deleteDoc } from 'firebase/firestore';
import db from '@/src/lib/firebase';

const deletePost = async (postId:string, nextRouter:AppRouterInstance) => {
  if (!postId) return;

  try {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
    console.log(`Post with ID ${postId} successfully deleted.`);
  } finally {
    nextRouter.push('/posts');
  }
};
export default deletePost;

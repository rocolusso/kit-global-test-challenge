import { doc, getDoc } from 'firebase/firestore';
import db from '@/src/lib/firebase';
import type { Post } from '@/src/lib/types';

const fetchPost = async (postId: string) => {
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  return {
    id: postSnap.id,
    ...postSnap.data(),
  } as Post;
};
export default fetchPost;

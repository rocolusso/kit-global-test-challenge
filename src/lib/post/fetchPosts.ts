import { collection, getDocs } from 'firebase/firestore';
import db from '@/src/lib/firebase';
import { Post } from '@/src/app/posts/page';

const fetchPosts = async () => {
  const postsCollection = collection(db, 'posts');
  const postsSnapshot = await getDocs(postsCollection);

  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return postsList;
};
export default fetchPosts;

type RawPost = {
    id: string;
    comments: string[];
    content: string;
    author: string;
    createdAt: string;
    title: string;
};

type PostComment = {
    id: string;
    author: string;
    content: string;
    createdAt: string;
};

type TransformedPost = {
    id: string;
    comments: PostComment[];
    content: string;
    author: string;
    createdAt: string;
    title: string;
};

const transformPost = (init: RawPost): TransformedPost => {
  const transformedComments: PostComment[] = init.comments.map((text, index) => ({
    id: `${init.id}-comment-${index + 1}`,
    author: 'Anonymous',
    content: text,
    createdAt: new Date().toISOString(),
  }));

  return {
    ...init,
    comments: transformedComments,
  };
};
export default transformPost;

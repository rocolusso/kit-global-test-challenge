export type Comment = {
    id: string;
    author: string;
    content: string;
    createdAt: string;
};
export type Post = {
    author:string,
    comments: Comment[],
    content: string,
    createdAt: string,
    id: string
    title: string
}

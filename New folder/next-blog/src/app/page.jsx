import PostCard from '@/components/PostCard';
import { getAllPost } from '@/lib/postService';

export default async function Home() {
  const posts = await getAllPost();

  if (!posts) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load post. Please try again later.
      </div>
    );
  }

  if (!posts.length) {
    return <div className="text-center mt-10">No Posts Found.</div>;
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold">All post</h1>
      <div className="p-10 grid grid-cols-2 gap-5 max-w-5xl mx-auto">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

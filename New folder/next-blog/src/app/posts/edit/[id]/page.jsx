import PostForm from '@/components/PostForm';
import { getPostById } from '@/lib/postService';

const Edit = async ({ params }) => {
  const { id } = await params;
  const singlePost = await getPostById(id);
  const post = {
    ...singlePost,
    _id: singlePost._id?.toString(),
    createdAt: singlePost.createdAt?.toISOString(),
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Update or Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
};

export default Edit;

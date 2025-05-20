import Link from 'next/link';

const PostCard = ({ post }) => {
  return (
    <div className="shadow p-5">
      <p>{post?.createdAt.toLocaleDateString()}</p>
      <Link href={`/posts/show/${post._id}`} className="font-bold text-2xl">
        {post?.title}
      </Link>
      <p className="mt-3">{post?.content}</p>
    </div>
  );
};

export default PostCard;

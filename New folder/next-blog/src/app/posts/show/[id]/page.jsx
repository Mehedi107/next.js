import PostCard from '@/components/PostCard';
import { getPostById } from '@/lib/postService';
import React from 'react';

export default async function singlePostPage({ params }) {
  const { id } = await params;

  const singlePost = await getPostById(id);

  console.log('show post', typeof singlePost._id);

  if (!singlePost) {
    return <div className="text-center text-red-500">Server Error</div>;
  }

  return (
    <div className="w-1/2 shadow-2xl mx-auto p-10">
      <PostCard post={singlePost} />
    </div>
  );
}

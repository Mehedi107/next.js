'use client';
import { useActionState } from 'react';
import BtnSubmit from './buttons/BtnSubmit';
import { editPost } from '@/actions/post';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function PostForm({ post }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(handlePost, undefined);

  async function handlePost(prevState, formData) {
    const result = await editPost(prevState, formData);

    if (!result?.success) {
      toast.error('Something went wrong!');
    }

    toast.success('Post saved successfully!');
    setTimeout(() => router.push('/'), 1500);
  }

  return (
    <form
      action={action}
      className="max-w-3xl mx-auto p-10 flex flex-col gap-5 shadow-xl"
    >
      {/* post id */}
      <input type="hidden" name="postId" defaultValue={post._id} />
      {/* title */}
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={state?.title || post.title}
          className="block border w-full p-3"
        />
        {state?.errors?.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>
      {/* content */}
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          rows={6}
          className="block border w-full p-3"
          defaultValue={state?.content || post.content}
        ></textarea>
        {state?.errors?.content?.map((error, idx) => (
          <p key={idx} className="text-red-500 text-sm">
            {error}
          </p>
        ))}
      </div>

      <BtnSubmit label="Submit" pending={pending} />
    </form>
  );
}

'use client';

import { submitPost } from '@/actions/post';
import BtnSubmit from '@/components/buttons/BtnSubmit';
import FormInput from '@/components/inputs.jsx/FormInput';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
  const router = useRouter();

  async function handlePost(prevState, formData) {
    const result = await submitPost(prevState, formData);

    if (!result?.success) {
      toast.error('Something went wrong!');
    }

    toast.success('Post saved successfully!');
    setTimeout(() => router.push('/'), 1500);
  }

  const [state, action, pending] = useActionState(handlePost, undefined);

  return (
    <form
      action={action}
      className="max-w-3xl mx-auto p-10 bg-blue-50 flex flex-col gap-5 shadow-xl"
    >
      <FormInput label="Title" type="text" name="title" state={state} />

      <div>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          rows={6}
          className="block border w-full p-3"
          defaultValue={state?.content}
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
};

export default Page;

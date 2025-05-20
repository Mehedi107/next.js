'use client';

import { login } from '@/actions/auth';
import BtnLogin from '@/components/buttons/BtnLogin';
import FormInput from '@/components/inputs.jsx/FormInput';
import { useActionState } from 'react';

const page = () => {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <div>
      <div className="w-1/2 mx-auto">
        <h2 className="text-center text-4xl font-bold">Login</h2>

        <form action={action} className="p-10  mt-5 space-y-3">
          <FormInput label="Email" type="email" name="email" state={state} />
          <FormInput
            label="Password"
            type="password"
            name="password"
            state={state}
          />
          <div>
            <BtnLogin pending={pending} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

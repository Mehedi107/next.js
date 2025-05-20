'use client';

import { register } from '@/actions/auth';
import { useActionState } from 'react';

const Register = () => {
  const [state, action, isPending] = useActionState(register, undefined);
  return (
    <div>
      <div className="w-1/2 mx-auto">
        <h2 className="text-center text-4xl font-bold">Register</h2>

        <form action={action} className="p-10  mt-5 space-y-3">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={state?.data?.email}
              className="block border w-full p-3"
            />
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="block border w-full p-3"
            />
            {state?.errors?.password && (
              <p className="text-red-500">{state.errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="block border w-full p-3"
            />
            {state?.errors?.confirmPassword && (
              <p className="text-red-500">{state.errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <button
              disabled={isPending}
              type="submit"
              className={`block text-white  w-full p-3 ${
                isPending
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 cursor-pointer'
              }`}
            >
              {isPending ? 'Loading...' : 'Register'}
            </button>
            {state?.success && (
              <p className="text-green-600">Registration successful!</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

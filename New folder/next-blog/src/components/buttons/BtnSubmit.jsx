import React from 'react';

const BtnSubmit = ({ label, pending }) => {
  return (
    <button
      disabled={pending}
      type="submit"
      className={`block text-white  w-full p-3 ${
        pending
          ? 'bg-blue-300 cursor-not-allowed'
          : 'bg-blue-600 cursor-pointer'
      }`}
    >
      {pending ? 'Loading...' : label}
    </button>
  );
};

export default BtnSubmit;

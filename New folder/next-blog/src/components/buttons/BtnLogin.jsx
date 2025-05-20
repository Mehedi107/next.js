const BtnLogin = ({ pending }) => {
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
      {pending ? 'Loading...' : 'Login'}
    </button>
  );
};

export default BtnLogin;

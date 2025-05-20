const FormInput = ({ label, type, name, state }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={state?.[name]}
        className="block border w-full p-3"
      />
      {state?.errors?.[name] && (
        <p className="text-red-500">{state.errors[name]}</p>
      )}
    </div>
  );
};

export default FormInput;

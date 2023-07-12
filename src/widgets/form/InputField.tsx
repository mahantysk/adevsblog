export const InputField = (props: any) => {
  const labelText = props.labelText;
  const placeholder = props.placeholder;
  const classes = props.className;
  const labelClasses = props.labelClassName;
  const isPassword = props.password;
  return (
    <div className="w-full flex flex-col m-2 relative">
      <input
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        className={
          "peer text-base border-b-2 transition-colors placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-700 mb-4 " +
          classes
        }
        onChange={props.onChange}
        value={props.value}
      />
      <label
        className={
          "absolute  pointer-events-none -top-4 left-0 text-sm transition-all text-gray-600 peer-focus:text-gray-600 peer-focus:text-sm  peer-focus:-top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-0 " +
          labelClasses
        }
      >
        {labelText}
      </label>
    </div>
  );
};

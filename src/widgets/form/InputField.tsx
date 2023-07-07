export const InputField = (props: any) => {
  const labelText = props.labelText;
  const placeholder = props.placeholder;
  const classes = props.className;
  const labelClasses = props.labelClassName;
  const isPassword = props.password;
  return (
    <div className="w-full flex flex-col m-2">
      <label className={" " + labelClasses}>{labelText}</label>
      <input
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        className={classes}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

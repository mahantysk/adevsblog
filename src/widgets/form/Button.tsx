export const Button = (props: any) => {
  const isPrimary = props.primary;
  const isSecondary = props.secondary;
  const isDanger = props.danger;
  const isSuccess = props.success;
  const isWarning = props.warning;
  const isInfo = props.info;

  const primaryClasses = isPrimary
    ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    : "";
  const dangerClasses = isDanger
    ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    : "";
  const secondaryClasses = isSecondary
    ? "bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    : "";
  const successClasses = isSuccess
    ? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    : "";
  const warningClasses = isWarning
    ? "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
    : "";
  const infoClasses = isInfo
    ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    : "";

  const classes = `${primaryClasses} ${secondaryClasses} ${dangerClasses} ${successClasses} ${warningClasses} ${infoClasses} ${props.className}`;

  return (
    <div className="flex flex-col m-2">
      <input
        type="button"
        value={props.label}
        className={classes}
        onClick={props.onClick}
      />
    </div>
  );
};

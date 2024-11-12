interface IInputProps {
  type: 'email' | 'text';
  placeholder?: string;
  newValue?: string;
  minLength?: number;
  maxLength?: number;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({
  type,
  placeholder,
  newValue,
  minLength,
  maxLength,
  className,
  onChange,

}: IInputProps) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={newValue}
        maxLength={maxLength}
        minLength={minLength}
        className={className}
        onChange={onChange}
      />
    </>
  );
};

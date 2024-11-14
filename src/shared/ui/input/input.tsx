interface IInputProps {
  type: 'email' | 'text' | 'checkbox';
  placeholder?: string;
  newValue?: string;
  minLength?: number;
  maxLength?: number;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  ref?: React.Ref<HTMLInputElement>;
  autoFocus?: boolean;
  onClick?: React.MouseEventHandler;
  checked?: boolean;
}

export const Input = ({
  type,
  placeholder,
  newValue,
  minLength,
  maxLength,
  className,
  onChange,
  defaultValue,
  ref,
  checked,
  autoFocus,
  onClick,
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
        defaultValue={defaultValue}
        ref={ref}
        autoFocus={autoFocus}
        onClick={onClick}
        checked={checked}
      />
    </>
  );
};

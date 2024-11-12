interface IButtonProps {
  text: string;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: React.MouseEventHandler;
  onSubmit?: React.FormEventHandler;
  disabled?: boolean;
  form?: string;
}

export const Button = ({ text, type, onClick, onSubmit, className, disabled, form }: IButtonProps) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
      form={form}>
      {text}
    </button>
  );
};

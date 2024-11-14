import { useLocalStorage } from 'usehooks-ts';

interface IButtonProps {
  className?: string;
}

export const LogoutButton = ({ className }: IButtonProps) => {
  const [, setValue] = useLocalStorage<{ email: string }>('user', { email: '' });

  return (
    <button className={className} type="button" onClick={() => setValue({ email: '' })}>
      Выйти из профиля
    </button>
  );
};

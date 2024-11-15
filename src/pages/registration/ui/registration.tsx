import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import styles from './registration.module.scss';
import { Button, Input } from '../../../shared';
import { useNavigate } from 'react-router-dom';
export const Registration = () => {
  const [emailValue, setEmailValue] = useState('');
  const navigate = useNavigate();
  const [, setValue] = useLocalStorage<{ email: string }>('user', { email: '' });

  const handleEmail = () => {
    setValue({ email: emailValue });

    navigate('/project');
  };
  return (
    <div className={styles.registration}>
      <h1>Войти в приложение</h1>

      <Input onChange={(e) => setEmailValue(e.target.value)} placeholder="email" type="text" newValue={emailValue} className={styles.registration__input} />
      <Button text="Далее" onClick={handleEmail} disabled={!emailValue.match(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)} className={styles.registration__button} />
    </div>
  );
};

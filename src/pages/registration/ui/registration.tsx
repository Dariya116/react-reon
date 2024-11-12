import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import styles from './registration.module.scss';
import { Button, Input } from '../../../shared';
export const Registration = () => {
  const [emailValue, setEmailValue] = useState('');
  const [value, setValue] = useLocalStorage<{ users: { email: string }[] }>(
    'test-key',
    {
      users: [],
    },
  );

 const handleEmail = () => {
   const existingEmail = value.users.find((user) => user.email === emailValue);
   if (!existingEmail) {
     setValue({ users: [...value.users, { email: emailValue }] });
   }
   console.log(value);
 };
  return (
    <div className={styles.registration}>
      <h1>Войти в приложение</h1>

      <Input
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder="email"
        type="text"
        newValue={emailValue}
        className={styles.registration__input}
      />
      <Button
        text="Далее"
        onClick={handleEmail}
        disabled={!emailValue.match(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)}
        className={styles.registration__button}
      />
    </div>
  );
};

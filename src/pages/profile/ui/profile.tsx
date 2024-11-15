import { useLocalStorage } from 'usehooks-ts';
import { ProjectType } from '../../project/ui/project';
import { Button, LogoutButton } from '../../../shared';
import style from './profile.module.scss';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const [value] = useLocalStorage<{ email: string }>('user', { email: '' });
  const [project] = useLocalStorage<{ projects: ProjectType[] }>('project', { projects: [] });
  const navigate = useNavigate();

  return (
    <div className={style.profile}>
      <h1>Личный кабинет</h1>
      <p>email: {value.email}</p>
      <p>Всего проектов: {project.projects.filter((item) => item.userName === value.email).length}</p>
      <div className={style.profile__buttons}>
        <LogoutButton />
        <Button type="button" text={'На главную'} onClick={() => navigate('/project')} />
      </div>
    </div>
  );
};

import { useLocalStorage } from 'usehooks-ts';
import { ProjectType } from '../../project/ui/project';
import { LogoutButton } from '../../../shared';

export const Profile = () => {
  const [value] = useLocalStorage<{ email: string }>('user', { email: '' });
  const [project] = useLocalStorage<{ projects: ProjectType[] }>('project', { projects: [] });

  return (
    <div>
      <h1>Страница</h1>
      <p>email: {value.email}</p>
      <p>Всего проектов: {project.projects.filter((item) => item.userName === value.email).length}</p>
      <LogoutButton />
    </div>
  );
};

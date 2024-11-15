import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Button, Input } from '../../../shared';
import style from './project.module.scss';
import { useState } from 'react';
import { SquarePen, Check, Trash2 } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { v4 as uuidv4 } from 'uuid';

export interface ProjectType {
  id: string;
  projectName: string;
  userName: string;
  createDate: Date;
  tasks: {
    id: string;
    createDateTask: Date;
    textTask: string;
    checked: boolean;
  }[];
}

export const Project = () => {
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();

  const [value] = useLocalStorage<{ email: string }>('user', { email: '' });
  const [project, setProject] = useLocalStorage<{ projects: ProjectType[] }>('project', { projects: [] });

  const [projectValue, setProjectValue] = useState('');
  const [addProject, setAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
 

  const handleProject = () => {
    const newProject = {
      projectName: projectValue.trim() === '' ? 'Без названия' : projectValue,
      userName: value.email,
      id: uuidv4(),
      createDate: new Date(),
      tasks: [],
    };

    setProject((prevProject) => ({ ...prevProject, projects: [...prevProject.projects, newProject] }));
    setProjectValue('');
    setAddProject(false);
  };

  const handleEditProject = (projectId: string, e: React.MouseEvent) => {
    setEditingProject(projectId);
    e.stopPropagation();
  };

  const handleSaveProject = (projectId: string, e: React.MouseEvent) => {
    if (projectId === editingProject) {
      const newProjectNameValue = newProjectName.trim() === '' ? project.projects.find((p) => p.id === projectId)?.projectName : newProjectName;
      setProject((prevProject) => ({
        ...prevProject,
        projects: prevProject.projects.map((project) => (project.id === projectId ? { ...project, projectName: newProjectNameValue ?? '' } : project)),
      }));
    }
    setEditingProject(null);
    setNewProjectName('');
    e.stopPropagation();
  };

  const removeProject = (id: ProjectType['id'], e: React.MouseEvent) => {
    setProject((prevProject: { projects: ProjectType[] }) => ({
      ...prevProject,
      projects: prevProject.projects.filter((item) => item.id !== id),
    }));
    e.stopPropagation();
  };

  return (
    <div className={style.container} ref={parent}>
      <Link className={style.container__link} to="/profile">
        <p>Личный кабинет</p>
      </Link>
      <div className={style.container__add}>
        <Button
          text={'Добавить проект'}
          className={style.container__add_button}
          onClick={() => {
            setAddProject(true);
          }}
        />
        {addProject && (
          <div className={style.container__add_project}>
            <Input autoFocus type={'text'} minLength={1} placeholder="Название проекта" newValue={projectValue} onChange={(e) => setProjectValue(e.target.value)} />
            <Button text={'сохранить'} onClick={handleProject} />
          </div>
        )}
      </div>
      {project.projects
        .filter((item) => item.userName === value.email)
        .map((item) => (
          <div className={style.container__content} key={item.id} onClick={() => navigate(`/tasks/${item.id}`)}>
            {editingProject === item.id ? (
              <Input type="text" defaultValue={item.projectName} onChange={(e) => setNewProjectName(e.target.value)} onClick={(e) => e.stopPropagation()} autoFocus />
            ) : (
              <h2>{item.projectName}</h2>
            )}
            {editingProject === item.id ? (
              <Check onClick={(e) => handleSaveProject(item.id, e)} />
            ) : (
              <div className={style.container__content_group}>
                <SquarePen onClick={(e) => handleEditProject(item.id, e)} />
                <Trash2 onClick={(e) => removeProject(item.id, e)} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

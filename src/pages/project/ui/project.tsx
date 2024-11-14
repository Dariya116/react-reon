import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Button, Input } from '../../../shared';
import { useState, useRef, SetStateAction } from 'react';
import { SquarePen, Check, Trash2 } from 'lucide-react';

export interface ProjectType {
  id: number;
  projectName: string;
  userName: string;
  createDate: Date;
  tasks: {
    id: number;
    createDateTask: Date;
    textTask: string;
    checked: boolean;
  }[];
}

export const Project = () => {
  const [projectValue, setProjectValue] = useState('');
  const [value, setValue] = useLocalStorage<{ email: string }>('user', { email: '' });
  const [project, setProject] = useLocalStorage<{ projects: ProjectType[] }>('project', { projects: [] });
  const [addProject, setAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleProject = () => {
    setProject((prevProject) => ({
      ...prevProject,
      projects: [
        ...prevProject.projects,
        {
          projectName: projectValue,
          userName: value.email,
          id: Math.random(),
          createDate: new Date(),
          tasks: [],
        },
      ],
    }));
    setProjectValue('');
    setAddProject(false);
    console.log(project);
  };

  const handleEditProject = (projectName: SetStateAction<string>, e) => {
    setEditingProject(projectName);
    e.stopPropagation();
  };

  const handleSaveProject = (projectName: ProjectType['projectName'], e) => {
    setProject((prevProject) => ({
      ...prevProject,
      projects: prevProject.projects.map((project) => (project.projectName === projectName ? { ...project, projectName: newProjectName } : project)),
    }));
    setEditingProject('');
    e.stopPropagation();
  };

  const removeProject = (id: ProjectType['id'], e) => {
    setProject((prevProject: { projects: ProjectType[] }) => ({
      ...prevProject,
      projects: prevProject.projects.filter((item) => item.id !== id),
    }));
    e.stopPropagation();
  };

  return (
    <div>
      <Link to="/profile">{value.email}</Link>
      <div>
        <Button
          text={'Добавить проект'}
          onClick={() => {
            setAddProject(true);
          }}
        />
        {addProject && (
          <>
            <Input type={'text'} placeholder="Название проекта" newValue={projectValue} onChange={(e) => setProjectValue(e.target.value)} />
            <Button text={'сохранить'} onClick={handleProject} />
          </>
        )}
      </div>
      {project.projects
        .filter((item) => item.userName === value.email)
        .map((item) => (
          <div key={item.projectName} onClick={() => navigate(`/tasks/${item.id}`)}>
            {editingProject === item.projectName ? (
              <Input type="text" defaultValue={item.projectName} onChange={(e) => setNewProjectName(e.target.value)} onClick={(e) => e.stopPropagation()} ref={inputRef} autoFocus />
            ) : (
              <h2>{item.projectName}</h2>
            )}
            {editingProject === item.projectName ? (
              <Check onClick={(e) => handleSaveProject(item.projectName, e)} />
            ) : (
              <>
                <SquarePen onClick={(e) => handleEditProject(item.projectName, e)} />
                <Trash2 onClick={(e) => removeProject(item.id, e)} />
              </>
            )}
          </div>
        ))}
    </div>
  );
};

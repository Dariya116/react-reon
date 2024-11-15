import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { Check, SquarePen, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ProjectType } from '../../project/ui/project';
import style from './tasks.module.scss';
import { Button, Input } from '../../../shared';

export const Tasks = () => {
  const { id } = useParams();
  const [projectTask, setProjectTask] = useState('');
  const [editingTask, setEditingTask] = useState<ProjectType['tasks'][0] | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>('');
  const [showTask, setShowTask] = useState<ProjectType['tasks']>();
  const [project, setProject] = useLocalStorage<{ projects: ProjectType[] }>('project', { projects: [] });

  const handleSave = () => {
    const selectedProject = project.projects.find((item) => item.id === id);
    if (selectedProject) {
      const newTask = {
        id: uuidv4(),
        createDateTask: new Date(),
        textTask: projectTask,
        checked: false,
      };
      selectedProject.tasks = [...selectedProject.tasks, newTask];
      setProject((prevProject) => ({
        ...prevProject,
        projects: prevProject.projects.map((projectItem) => {
          if (projectItem.id === selectedProject.id) {
            return {
              ...projectItem,
              tasks: selectedProject.tasks,
            };
          }
          return projectItem;
        }),
      }));
      setProjectTask('');
      console.log(project);
    }
  };
  useEffect(() => {
    setShowTask(project.projects.find((item) => item.id === id)?.tasks);
  }, [projectTask, project, id]);

  const handleEditTask = (task: ProjectType['tasks'][0]) => {
    setEditingTask(task);
    setEditedTaskText(task.textTask);
  };

  const removeTask = (taskId: string) => {
    const selectedProject = project.projects.find((item) => item.id === id);
    if (selectedProject) {
      selectedProject.tasks = selectedProject.tasks.filter((task) => task.id !== taskId);
      setProject((prevProject) => ({
        ...prevProject,
        projects: prevProject.projects.map((projectItem) => {
          if (projectItem.id === selectedProject.id) {
            return {
              ...projectItem,
              tasks: selectedProject.tasks,
            };
          }
          return projectItem;
        }),
      }));
    }
  };

  const handleSaveEditedTask = () => {
    const selectedProject = project.projects.find((item) => item.id === id);
    if (selectedProject) {
      const taskIndex = selectedProject.tasks.findIndex((task) => task.id === editingTask?.id);
      if (taskIndex !== -1) {
        selectedProject.tasks[taskIndex].textTask = editedTaskText;
        setProject((prevProject) => ({
          ...prevProject,
          projects: prevProject.projects.map((projectItem) => {
            if (projectItem.id === selectedProject.id) {
              return {
                ...projectItem,
                tasks: selectedProject.tasks,
              };
            }
            return projectItem;
          }),
        }));
      }
    }
    setEditingTask(null);
  };

  const handleToggleChecked = (taskId: string) => {
    const selectedProject = project.projects.find((item) => item.id === id);
    if (selectedProject) {
      const taskIndex = selectedProject.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        selectedProject.tasks[taskIndex].checked = !selectedProject.tasks[taskIndex].checked;
        setProject((prevProject) => ({
          ...prevProject,
          projects: prevProject.projects.map((projectItem) => {
            if (projectItem.id === selectedProject.id) {
              return {
                ...projectItem,
                tasks: selectedProject.tasks,
              };
            }
            return projectItem;
          }),
        }));
      }
    }
  };

  return (
    <div className={style.tasks}>
      <h1>{project.projects.find((item) => item.id === id)?.projectName}</h1>
      <Input className={style.tasks__input} type={'text'} placeholder="Введите задачу" newValue={projectTask} onChange={(e) => setProjectTask(e.target.value)} />
      <Button text={'сохранить'} onClick={handleSave} />

      <div className={style.tasks__container}>
        {showTask &&
          showTask.map((item, index) => (
            <div key={index} className={style.tasks__container_item}>
              <Input className={style.tasks__container_item_checkbox} type={'checkbox'} checked={item.checked} onChange={() => handleToggleChecked(item.id)} />
              {editingTask && editingTask.id === item.id ? (
                <Input type={'text'} className={style.tasks__container_item_input} newValue={editedTaskText} onChange={(e) => setEditedTaskText(e.target.value)} autoFocus />
              ) : (
                <span color={'red'}>{item.textTask}</span>
              )}
              {editingTask && editingTask.id === item.id ? (
                <Check onClick={handleSaveEditedTask} />
              ) : (
                <div className={style.tasks__container_icons}>
                  <SquarePen onClick={() => handleEditTask(item)} />
                  <Trash2 onClick={() => removeTask(item.id)} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

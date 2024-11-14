import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Button, Input } from '../../../shared';
import { useEffect, useRef, useState } from 'react';
import { Check, SquarePen, Trash2 } from 'lucide-react';
import { ProjectType } from '../../project/ui/project';
export const Tasks = () => {
  const { id } = useParams();
  const [projectTask, setProjectTask] = useState('');
  const [editingTask, setEditingTask] = useState<ProjectType['tasks'] | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<ProjectType['tasks']>();
  const [showTask, setShowTask] = useState<ProjectType['tasks']>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [project, setProject] = useLocalStorage<{ projects: ProjectType[] }>('project', { projects: [] });

  const handleSave = () => {
    const selectedProject = project.projects.find((item) => item.id === Number(id));
    if (selectedProject) {
      const newTask = {
        id: Math.random(),
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
      setProjectTask(''); // clear the input field
      console.log(project);
    }
  };
  useEffect(() => {
    setShowTask(project.projects.find((item) => item.id === Number(id))?.tasks);
  }, [projectTask, project, id]);

  const handleEditTask = (task: ProjectType['tasks']) => {
    setEditingTask(task);
    setEditedTaskText(task.textTask);
  };

  const removeTask = (taskId: number) => {
    const selectedProject = project.projects.find((item) => item.id === Number(id));
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
    const selectedProject = project.projects.find((item) => item.id === Number(id));
    if (selectedProject) {
      const taskIndex = selectedProject.tasks.findIndex((task) => task.id === editingTask.id);
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

  const handleToggleChecked = (taskId: number) => {
    const selectedProject = project.projects.find((item) => item.id === Number(id));
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
    <div>
      {project.projects.find((item) => item.id === Number(id))?.projectName}
      <Input type={'text'} placeholder="Введите задачу" newValue={projectTask} onChange={(e) => setProjectTask(e.target.value)} />
      <Button text={'сохранить'} onClick={handleSave} />
      <div>
        {showTask &&
          showTask.map((item, index) => (
            <div key={index}>
              <Input type={'checkbox'} checked={item.checked} onChange={() => handleToggleChecked(item.id)} />
              {editingTask && editingTask.id === item.id ? (
                <Input type={'text'} newValue={editedTaskText} onChange={(e) => setEditedTaskText(e.target.value)} ref={inputRef} autoFocus />
              ) : (
                <span color={'red'}>{item.textTask}</span>
              )}
              {editingTask && editingTask.id === item.id ? (
                <Check onClick={handleSaveEditedTask} />
              ) : (
                <>
                  <SquarePen onClick={() => handleEditTask(item)} />
                  <Trash2 onClick={() => removeTask(item.id)} />
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

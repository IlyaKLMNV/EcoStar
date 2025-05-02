import { FC } from 'react';
import { Task } from '../types/task';

interface Props {
  task: Task;
}

const TaskItem: FC<Props> = ({ task }) => {
  return (
    <div className={`task-row ${task.completed ? 'task-row--done' : 'task-row--undone'}`}>
      <div className="task-row__status">
        {task.completed ? '✔️ Done' : '⏳ Undone'}
      </div>
      <div className="task-row__title">
        {task.title}
      </div>
    </div>
  );
};

export default TaskItem;

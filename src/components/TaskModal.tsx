import { FC, MouseEvent, useEffect } from 'react';
import { Task } from '../types/task';
import TaskList from './TaskList';

interface Props {
  tasks: Task[];
  onClose: () => void;
}

const TaskModal: FC<Props> = ({ tasks, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>×</button>
        <h2 className="modal__title">User Tasks</h2>
        <div className="modal__scroll">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

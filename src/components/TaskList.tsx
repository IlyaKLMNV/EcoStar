import { FC, useState } from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItem';

interface Props {
  tasks: Task[];
}

const TaskList: FC<Props> = ({ tasks }) => {
  const [filter, setFilter] = useState<'all' | 'done' | 'undone'>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFilterChange = (value: 'all' | 'done' | 'undone') => {
    setFilter(value);
    setDropdownOpen(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') return task.completed;
    if (filter === 'undone') return !task.completed;
    return true;
  });

  return (
    <div className="task-table">
      <div className="task-table__header">
        <div className="task-table__col task-table__col--status">
          <button
            className={`task-table__filter-btn ${dropdownOpen ? 'is-open' : ''}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Status
          </button>
          {dropdownOpen && (
            <ul className="task-table__dropdown">
              <li onClick={() => handleFilterChange('all')}>All</li>
              <li onClick={() => handleFilterChange('done')}>Done</li>
              <li onClick={() => handleFilterChange('undone')}>Undone</li>
            </ul>
          )}
        </div>
        <div className="task-table__col task-table__col--title">Title</div>
      </div>

      <div className="task-table__body">
        {filteredTasks.length === 0 ? (
          <p className="task-table__empty">No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

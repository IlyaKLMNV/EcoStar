import { useEffect, useState } from 'react';
import { User } from './types/user';
import { Task } from './types/task';
import UserList from './components/UserList';
import TaskModal from './components/TaskModal';
import './styles/global.scss';

const App = () => {
  const [rawUsers, setRawUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [usersWithStats, setUsersWithStats] = useState<
    (User & { completed: number; incomplete: number })[]
  >([]);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [usersRes, tasksRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/todos')
        ]);

        if (!usersRes.ok || !tasksRes.ok) {
          throw new Error('Failed to fetch data from server');
        }

        const usersData: User[] = await usersRes.json();
        const tasksData: Task[] = await tasksRes.json();

        if (!Array.isArray(usersData) || !Array.isArray(tasksData)) {
          throw new Error('Invalid data format');
        }

        setRawUsers(usersData);
        setTasks(tasksData);
      } catch (err) {
        setError((err as Error).message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rawUsers.length && tasks.length) {
      const enhanced = rawUsers.map(user => {
        const userTasks = tasks.filter(task => task.userId === user.id);
        return {
          ...user,
          completed: userTasks.filter(t => t.completed).length,
          incomplete: userTasks.filter(t => !t.completed).length,
        };
      });
      setUsersWithStats(enhanced);
    }
  }, [rawUsers, tasks]);

  const handleUserSelect = (id: number) => {
    setSelectedUserId(id);
    const selectedTasks = tasks.filter(task => task.userId === id);
    setUserTasks(selectedTasks);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setUserTasks([]);
  };

  return (
    <div className="app">
      <h1 className="app__title">Users list</h1>

      {isLoading && (
        <div className="loader" aria-label="Loading">
          <div className="loader__spinner"></div>
        </div>
    )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!isLoading && !error && (
        <>
          {usersWithStats.length === 0 && <p>No users found.</p>}

          <UserList
            users={usersWithStats}
            selectedUserId={selectedUserId}
            onUserSelect={handleUserSelect}
          />

          {isModalOpen && (
            <TaskModal tasks={userTasks} onClose={handleModalClose} />
          )}
        </>
      )}
    </div>
  );
};

export default App;

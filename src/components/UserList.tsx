import { FC } from 'react';
import { User } from '../types/user';
import UserItem from './UserItem';

interface Props {
  users: (User & { completed: number; incomplete: number })[];
  selectedUserId: number | null;
  onUserSelect: (id: number) => void;
}

const UserList: FC<Props> = ({ users, selectedUserId, onUserSelect }) => {
  return (
    <ul className="user-list">
      {users.map((user, index) => (
        <UserItem
          key={user.id}
          index={index}
          user={user}
          isSelected={user.id === selectedUserId}
          onSelect={() => onUserSelect(user.id)}
        />
      ))}
    </ul>
  );
};

export default UserList;

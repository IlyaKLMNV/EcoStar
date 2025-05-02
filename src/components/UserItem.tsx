import { FC } from 'react';
import { User } from '../types/user';

interface Props {
  user: User & { completed: number; incomplete: number };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const UserItem: FC<Props> = ({ user, index, isSelected, onSelect }) => {
  return (
    <li
      className={`user-item ${isSelected ? 'user-item--selected' : ''}`}
      onClick={onSelect}
    >
      <div className="user-item__header">
        <span className="user-item__number">{index + 1}.</span>
        <span className="user-item__name">{user.name}</span>
      </div>
      <div className="user-item__email">{user.email}</div>
      <div className="user-item__stats">
        ✅ {user.completed} &nbsp; ⏳ {user.incomplete}
      </div>
    </li>
  );
};

export default UserItem;

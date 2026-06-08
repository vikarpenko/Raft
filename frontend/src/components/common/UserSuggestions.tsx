import type { User } from '@/types/user';
import './UserSuggestions.css';

interface UserSuggestionsProps {
  users: User[];
  onPick: (user: User) => void;
}

export function UserSuggestions({ users, onPick }: UserSuggestionsProps) {
  if (users.length === 0) return null;
  return (
    <ul className="usuggest">
      {users.map((user) => (
        <li key={user.id}>
          <button
            type="button"
            className="usuggest__item"
            onMouseDown={(event) => {
              event.preventDefault();
              onPick(user);
            }}
          >
            <span className="usuggest__avatar">
              {(user.firstName[0] ?? '') + (user.lastName[0] ?? '')}
            </span>
            <span className="usuggest__text">
              <span className="usuggest__name">
                {user.firstName} {user.lastName}
              </span>
              {user.username && <span className="usuggest__handle">@{user.username}</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

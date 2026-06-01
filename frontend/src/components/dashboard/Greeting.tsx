import { useEffect, useState } from 'react';
import { getUser } from '@/api/user';
import type { User } from '@/types/user';
import './Greeting.css';

function timeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function todayLabel(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function Greeting() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;
    getUser().then((u) => {
      if (active) setUser(u);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <header className="greeting">
      <h1 className="greeting__title">
        {timeGreeting()}
        {user ? `, ${user.firstName}!` : '!'}
      </h1>
      <p className="greeting__date">{todayLabel()}</p>
    </header>
  );
}

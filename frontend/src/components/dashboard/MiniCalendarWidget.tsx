import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '@/api/tasks';
import { monthGridDays, toISODate } from '@/lib/calendar';
import { Icon } from '@/lib/icons';
import type { Task } from '@/types/task';
import './MiniCalendarWidget.css';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function MiniCalendarWidget() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    let active = true;
    getTasks().then((all) => {
      if (active) setTasks(all);
    });
    return () => {
      active = false;
    };
  }, []);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = toISODate(now);

  const taskDates = useMemo(() => new Set(tasks.map((task) => task.dueDate)), [tasks]);
  const days = useMemo(() => monthGridDays(year, month), [year, month]);

  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link to="/calendar" className="mini-cal">
      <div className="mini-cal__head">
        <span className="mini-cal__title">{monthLabel}</span>
        <Icon name="chevron-right" size={16} className="mini-cal__chevron" />
      </div>

      <div className="mini-cal__grid">
        {WEEKDAYS.map((weekday, index) => (
          <span key={index} className="mini-cal__weekday">
            {weekday}
          </span>
        ))}

        {days.map((date) => {
          const iso = toISODate(date);
          const inMonth = date.getMonth() === month;
          const hasTasks = inMonth && taskDates.has(iso);
          return (
            <span
              key={iso}
              className={`mini-cal__day${inMonth ? '' : ' mini-cal__day--muted'}${iso === today ? ' mini-cal__day--today' : ''}`}
            >
              {date.getDate()}
              {hasTasks && <span className="mini-cal__dot" />}
            </span>
          );
        })}
      </div>
    </Link>
  );
}

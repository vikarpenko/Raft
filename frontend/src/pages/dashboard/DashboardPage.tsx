import { useEffect, useState } from 'react';
import { getTasks } from '@/api/tasks';
import { TodayTasksWidget } from '@/components/dashboard/TodayTasksWidget';
import { MiniCalendarWidget } from '@/components/dashboard/MiniCalendarWidget';
import { SpacesWidget } from '@/components/dashboard/SpacesWidget';
import type { Task } from '@/types/task';
import './DashboardPage.css';

export function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    getTasks()
      .then((all) => {
        if (active) setTasks(all);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__grid">
        <MiniCalendarWidget tasks={tasks} />
        <TodayTasksWidget tasks={tasks} loading={loading} error={error} />
      </div>

      <SpacesWidget />
    </div>
  );
}

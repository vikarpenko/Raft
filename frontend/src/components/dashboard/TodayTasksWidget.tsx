import { useEffect, useState } from 'react';
import { getTasks } from '@/api/tasks';
import type { Task, TaskStatus, TaskPriority } from '@/types/task';
import './TodayTasksWidget.css';

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To-Do',
  in_progress: 'In progress',
  done: 'Done',
};

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

function todayISO(): string {
  return new Date().toLocaleDateString('en-CA');
}

export function TodayTasksWidget() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getTasks().then((all) => {
      if (!active) return;
      const today = todayISO();
      setTasks(all.filter((t) => t.dueDate === today));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const activeTasks = tasks.filter((t) => t.status !== 'done');
  const doneCount = tasks.length - activeTasks.length;

  return (
    <section className="today-tasks">
      <header className="today-tasks__header">
        <h2 className="today-tasks__title">Today&rsquo;s Tasks</h2>
        {!loading && <span className="today-tasks__count">{activeTasks.length}</span>}
      </header>

      {loading ? (
        <p className="today-tasks__muted">Loading&hellip;</p>
      ) : activeTasks.length === 0 ? (
        <p className="today-tasks__muted">Nothing left for today &mdash; enjoy the calm.</p>
      ) : (
        <ul className="today-tasks__list">
          {activeTasks.map((task) => (
            <li key={task.id} className="task-row">
              <span className={`task-row__status task-row__status--${task.status}`}>
                {statusLabels[task.status]}
              </span>
              <span className="task-row__title">{task.title}</span>
              <span className={`task-row__priority task-row__priority--${task.priority}`}>
                {priorityLabels[task.priority]}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && doneCount > 0 && (
        <p className="today-tasks__done-note">
          {doneCount} completed today
        </p>
      )}
    </section>
  );
}

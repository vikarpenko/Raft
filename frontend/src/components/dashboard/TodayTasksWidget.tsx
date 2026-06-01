import { Fragment, useEffect, useState } from 'react';
import { getTasks } from '@/api/tasks';
import { byDueTime, getTaskState, isDueOn, todayISO } from '@/lib/tasks';
import type { Task, TaskPriority } from '@/types/task';
import './TodayTasksWidget.css';

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function TodayTasksWidget() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getTasks().then((all) => {
      if (active) {
        setTasks(all);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const now = new Date();
  const today = todayISO(now);

  const items = tasks
    .filter((task) => isDueOn(task, today) && !task.completed)
    .sort(byDueTime)
    .map((task) => ({ task, state: getTaskState(task, now) }));

  const firstUpcoming = items.findIndex(({ state }) => state === 'upcoming');
  const nowAt = firstUpcoming > 0 ? firstUpcoming : -1;

  return (
    <section className="today-tasks">
      <header className="today-tasks__head">
        <span className="today-tasks__title">Today&rsquo;s tasks</span>
      </header>

      {loading ? (
        <p className="today-tasks__muted">Loading&hellip;</p>
      ) : items.length === 0 ? (
        <p className="today-tasks__muted">Nothing left for today &mdash; enjoy the calm.</p>
      ) : (
        <ol className="timeline">
          {items.map(({ task, state }, index) => {
            const overdue = state === 'overdue';
            return (
              <Fragment key={task.id}>
                {index === nowAt && (
                  <li className="timeline__now" aria-hidden="true">
                    <span>now</span>
                  </li>
                )}
                <li className="timeline__row">
                  <div className="timeline__time">
                    <span className={`timeline__clock${overdue ? ' timeline__clock--overdue' : ''}`}>
                      {task.dueTime ?? '—'}
                    </span>
                    <span className="timeline__rail" />
                  </div>
                  <div className={`timeline__card${overdue ? ' timeline__card--overdue' : ''}`}>
                    <span className={`timeline__priority timeline__priority--${task.priority}`}>
                      {priorityLabels[task.priority]}
                    </span>
                    <p className="timeline__name">
                      {task.title}
                      {overdue && <span className="timeline__tag">Overdue</span>}
                    </p>
                    {task.description && <p className="timeline__desc">{task.description}</p>}
                  </div>
                </li>
              </Fragment>
            );
          })}
        </ol>
      )}
    </section>
  );
}

import { Greeting } from '@/components/dashboard/Greeting';
import { TodayTasksWidget } from '@/components/dashboard/TodayTasksWidget';
import './DashboardPage.css';

export function DashboardPage() {
  return (
    <div className="dashboard">
      <Greeting />

      <div className="dashboard__grid">
        <TodayTasksWidget />
      </div>
    </div>
  );
}

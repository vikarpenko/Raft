import { TodayTasksWidget } from '@/components/dashboard/TodayTasksWidget';
import './DashboardPage.css';

export function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="dashboard__grid">
        <TodayTasksWidget />
      </div>
    </div>
  );
}

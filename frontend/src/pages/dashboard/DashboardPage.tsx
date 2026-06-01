import { TodayTasksWidget } from '@/components/dashboard/TodayTasksWidget';
import { MiniCalendarWidget } from '@/components/dashboard/MiniCalendarWidget';
import './DashboardPage.css';

export function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="dashboard__grid">
        <MiniCalendarWidget />
        <TodayTasksWidget />
      </div>
    </div>
  );
}

import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { TodoPage } from '@/pages/TodoPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="todo" element={<TodoPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}

export default App;

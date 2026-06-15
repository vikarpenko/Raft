import { api } from '@/api/http';
import type { StatisticsResponse, StatsPeriod } from '@/types/statistics';

/** Fetches task/expense chart data and top workspaces for the given period (`WEEK`/`MONTH`/`YEAR`). */
export function getStatistics(period: StatsPeriod): Promise<StatisticsResponse> {
    return api.get<StatisticsResponse>(`/statistics?period=${period}`);
}

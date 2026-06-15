import { api } from '@/api/http';
import type {
    ExpenseResponse,
    WorkspaceExpenseStatsResponse,
    CreateExpenseRequest,
    PersonalExpenseStatsResponse
} from "@/types/expense.ts";

/** Lists all expenses of a shared workspace. */
export const getWorkspaceExpenses = (workspaceId: string)=>
    api.get<ExpenseResponse[]>(`/workspaces/${workspaceId}/expenses`,);

/** Returns a workspace's expense summary (balances per member). */
export const getWorkspaceStats = (workspaceId: string) =>
    api.get<WorkspaceExpenseStatsResponse>(`/workspaces/${workspaceId}/expenses/stats`,);

/** Creates an expense and its splits. */
export const createExpense = (request: CreateExpenseRequest)=>
    api.post<ExpenseResponse>('/expenses', request,);

/** Marks one split (one person's share) as settled. */
export const settleSplit = (splitId: string) =>
    api.patch(`/expenses/splits/${splitId}/settle`);

/** Fetches the user's personal expense stats and paged history, optionally filtered by date range. */
export const getPersonalStats = (params?: {
    from?: string;
    to?: string;
    page?: number;
    size?: number;
}) => {
    const search = new URLSearchParams();

    if (params?.from) search.append("from", params.from);
    if (params?.to) search.append("to", params.to);
    if (params?.page !== undefined) search.append("page", params.page.toString());
    if (params?.size !== undefined) search.append("size", params.size.toString());

    return api.get<PersonalExpenseStatsResponse>(
        `/expenses/my?${search.toString()}`
    );
};

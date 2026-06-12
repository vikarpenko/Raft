import { api } from '@/api/http';
import type {ExpenseResponse, WorkspaceExpenseStatsResponse, CreateExpenseRequest} from "@/types/expense.ts";

export const getWorkspaceExpenses = (workspaceId: string)=>
    api.get<ExpenseResponse[]>(`/workspaces/${workspaceId}/expenses`,);

export const getWorkspaceStats = (workspaceId: string) =>
    api.get<WorkspaceExpenseStatsResponse>(`/workspaces/${workspaceId}/expenses/stats`,);

export const createExpense = (request: CreateExpenseRequest)=>
    api.post<ExpenseResponse>('/expenses', request,);

export const settleSplit = (splitId: string) =>
    api.patch(`/expenses/splits/${splitId}/settle`);

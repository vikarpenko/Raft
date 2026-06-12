export interface UserSummaryResponse {
    id: string,
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export interface ExpenseSplitResponse {
    user: UserSummaryResponse;
    share: number;
    isSettled: boolean;
}

export interface ExpenseResponse {
    id: string;
    title: string;
    amount: number;
    paidBy: UserSummaryResponse;
    splits: ExpenseSplitResponse[];
    createdAt: string;
}

export interface UserBalanceResponse {
    user: UserSummaryResponse;
    totalPaid: number;
    totalOwes: number;
    balance: number;
}

export interface WorkspaceExpenseStatsResponse {
    totalAmount: number;
    balances: UserBalanceResponse[];
    recentExpenses: ExpenseResponse[];
}

export interface CreateExpenseRequest {
    title: string;
    amount: number;
    workspaceId: string;
    participantIds: string[];
}

import type {WorkspaceExpenseStatsResponse} from "@/types/expense.ts";
import {fmt} from "@/components/workspaceExpenses/utils/format.ts";
interface Props {
    stats: WorkspaceExpenseStatsResponse;
    currentUserId: string;
}

export function ExpenseSummary({ stats, currentUserId }: Props) {
    const myBalance = stats.balances.find((b) => b.user.id === currentUserId);

    return (
        <div className="we__summary">
            <div className="we__summary-item">
                <span className="we__summary-label">Total spent</span>
                <span className="we__summary-value">{fmt(stats.totalAmount)}</span>
            </div>

            {myBalance && (
                <div className={`we__summary-item ${myBalance.balance < 0 ? 'we__summary-item--owe' : ''}`}>
                    <span className="we__summary-label">
                        {myBalance.balance >= 0 ? 'Owed to me' : 'I owe'}
                    </span>
                    <span className="we__summary-value">
                        {fmt(Math.abs(myBalance.balance))}
                    </span>
                </div>
            )}

            <div className="we__summary-item">
                <span className="we__summary-label">Transactions</span>
                <span className="we__summary-value">{stats.recentExpenses.length}</span>
            </div>
        </div>
    );
}

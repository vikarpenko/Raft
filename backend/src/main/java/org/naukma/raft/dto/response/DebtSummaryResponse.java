package org.naukma.raft.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class DebtSummaryResponse {
    private UserSummaryResponse user;
    private BigDecimal amount;
    private List<ExpenseResponse> relatedExpenses;
}

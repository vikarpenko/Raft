package org.naukma.raft.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class PersonalExpenseStatsResponse {
    private BigDecimal totalOwedToMe;
    private BigDecimal totalIOwe;
    private List<DebtSummaryResponse> iOwe;
    private List<DebtSummaryResponse> iOwedToMe;
    private List<ExpenseResponse> history;
}

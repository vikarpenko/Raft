package org.naukma.raft.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "expense_members")
public class ExpenseMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expence_id", nullable = false)
    private Expense expense;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Double share;

    @Column(name = "is_settled", nullable = false)
    private boolean isSettled = false;
}

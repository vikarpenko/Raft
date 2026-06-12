import {useState} from 'react';
import type {CreateExpenseRequest} from "@/types/expense.ts";
import { Modal } from '@/components/common/Modal.tsx';
import type{FormEvent} from "react";
import type {Member} from "@/types/workspace.ts";

interface AddModalProps {
    workspaceId: string;
    members: Member[];
    onClose(): void;
    onAdd(request: CreateExpenseRequest): Promise<void>;
}

export function AddExpenseModal({ workspaceId, members, onClose, onAdd }: AddModalProps) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const toggleMember = (id: string) => {
        setSelectedMembers(prev =>
            prev.includes(id)
            ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if(!title.trim()) return;

        if(!amount) return;

        if(selectedMembers.length === 0) return;

        const parsedAmount = Number(amount);
        if(parsedAmount <= 0) return;

        onAdd({
            title,
            amount: parsedAmount,
            workspaceId,
            participantIds: selectedMembers,
        });

        onClose();
    }

    return (
        <Modal
            as = "form"
            onSubmit={handleSubmit}
            onClose={onClose}
        >
            <h2 className="modal__title">Add Expense</h2>

            <label className="modal__field-wrap">
                <span className="modal__label">Title</span>
                <input
                    className="modal__input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label className="modal__field-wrap">
                <span className="modal__label">Amount</span>
                <input
                    className="modal__input"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
            </label>

            <div className="we__add-members">
                <h3 className="modal__title">Participants</h3>

                {members.map(member => (
                    <label
                        className="modal__label"
                        key={member.userId}>
                        <input
                            className="modal__input"
                            type="checkbox"
                            checked={selectedMembers.includes(member.userId)}
                            onChange={() => toggleMember(member.userId)}
                            />

                        {member.firstName} {member.lastName}
                    </label>
                ))}
            </div>

            <div className="modal__actions">
                <span className="modal__spacer"/>
                <button
                    type="button"
                    className="modal__btn modal__btn--ghost"
                    onClick={onClose}
                    >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="modal__btn modal__btn--ghost"
                    disabled={
                        !title.trim() ||
                        !amount ||
                        selectedMembers.length === 0
                    }
                >
                    Save
                </button>
            </div>
        </Modal>
    );
}

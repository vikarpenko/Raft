import { Icon } from '@/lib/icons';

interface EmptyStateProps {
    label: string;
}

export function EmptyState({ label }: EmptyStateProps) {
    return (
        <div className="inbox-empty">
            <span className="inbox-empty__icon"><Icon name="inbox" size={28} /></span>
            <p>{label}</p>
        </div>
    );
}
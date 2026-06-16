import { Icon } from '@/lib/icons';

const TIPS = [
    'Use chats to share yours thoughts with workspace members.',
    'Set reminders for task to not forget them.',
    'Pin important notes to your dashboard for quick access.',
    'Create shared folders to collaborate with your team.',
    'Filter tasks by priority to focus on what matters most.',
];

export function UsageTips() {
    return (
        <div className="help-sidebar-block">
            <h3 className="help-sidebar__title">Usage tips</h3>
            <ul className="tips-list">
                {TIPS.map((tip, idx) => (
                    <li key={idx} className="tip-item">
                        <Icon name="tip" className="tip-icon"></Icon>
                        <span className="tip-text">{tip}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
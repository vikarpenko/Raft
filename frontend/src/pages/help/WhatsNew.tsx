const UPDATES = [
    {
        date: '16 june. 2026',
        text: 'Added achievements — get awards for activity!',
    },
    {
        date: '15 june 2026',
        text: 'New way to express yourself in workspaces - added chats for members.',
    },
    {
        date: '13 june 2026',
        text: 'Added pin board - pin image or note for quick access!',
    },
    {
        date: '9 june 2026',
        text: 'New themes and accents colors - customise your app!',
    },
];

export function WhatsNew() {
    return (
        <div className="help-sidebar-block">
            <h3 className="help-sidebar__title">What's new</h3>
            <ul className="whatsnew-list">
                {UPDATES.map((item) => (
                    <li key={item.date} className="whatsnew-item">
                        <span className="whatsnew-date">{item.date}</span>
                        <p className="whatsnew-text">{item.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
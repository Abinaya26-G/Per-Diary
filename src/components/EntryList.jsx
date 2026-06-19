import EntryCard from './EntryCard';

export default function EntryList({ entries, onView, onEdit, onDelete, searchTerm }) {
  const filteredEntries = entries.filter(entry => {
    const term = searchTerm.toLowerCase();
    return (
      entry.title.toLowerCase().includes(term) ||
      entry.date.includes(term) ||
      entry.content.toLowerCase().includes(term)
    );
  });

  if (filteredEntries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <h3>{searchTerm ? 'No matches found' : 'No entries yet'}</h3>
        <p>{searchTerm ? 'Try a different search term' : 'Start writing your first diary entry!'}</p>
      </div>
    );
  }

  return (
    <div>
      {filteredEntries.map(entry => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
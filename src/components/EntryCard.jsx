import { formatDate, getWordCount } from '../utils/exportUtils';

export default function EntryCard({ entry, onView, onEdit, onDelete }) {
  return (
    <div className="entry-card" onClick={() => onView(entry)}>
      <div className="entry-card-header">
        <div>
          <div className="entry-card-title">{entry.title}</div>
          <div className="entry-card-date">
            📅 {formatDate(entry.date)}
          </div>
        </div>
        {entry.mood && <span className="entry-card-mood">{entry.mood}</span>}
      </div>
      
      <div className="entry-card-preview">{entry.content}</div>
      
      <div className="entry-card-footer">
        <span className="entry-card-stats">
          {getWordCount(entry.content)} words • {entry.content.length} chars
        </span>
        <div className="entry-card-actions" onClick={(e) => e.stopPropagation()}>
          <button className="btn btn-sm btn-secondary btn-icon" onClick={() => onEdit(entry)} title="Edit">
            ✏️
          </button>
          <button className="btn btn-sm btn-danger btn-icon" onClick={() => onDelete(entry.id)} title="Delete">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
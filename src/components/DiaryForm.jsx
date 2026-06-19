import { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import { getWordCount, getCharCount } from '../utils/exportUtils';

export default function DiaryForm({ 
  onSave, 
  editingEntry, 
  onCancelEdit,
  draft,
  onDraftChange 
}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setDate(editingEntry.date);
      setContent(editingEntry.content);
      setMood(editingEntry.mood || '');
    } else if (draft) {
      setTitle(draft.title || '');
      setDate(draft.date || new Date().toISOString().split('T')[0]);
      setContent(draft.content || '');
      setMood(draft.mood || '');
    }
  }, [editingEntry, draft]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (title || content) {
        onDraftChange({ title, date, content, mood });
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [title, date, content, mood, onDraftChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    
    const entry = {
      id: editingEntry ? editingEntry.id : Date.now().toString(),
      title: title.trim(),
      date,
      content: content.trim(),
      mood,
      createdAt: editingEntry ? editingEntry.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(entry);
    
    if (!editingEntry) {
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setContent('');
      setMood('');
      onDraftChange(null);
    }
    
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleCancel = () => {
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setContent('');
    setMood('');
    onDraftChange(null);
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="Give your entry a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      <MoodSelector selected={mood} onSelect={setMood} />

      <div className="form-group">
        <label className="form-label">Diary Entry</label>
        <textarea
          className="form-textarea"
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="counter-bar">
          <span>📝 {getWordCount(content)} words</span>
          <span>🔤 {getCharCount(content)} characters</span>
        </div>
      </div>

      <div className="btn-group">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? '⏳ Saving...' : (editingEntry ? '💾 Update Entry' : '💾 Save Entry')}
        </button>
        {editingEntry && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            ❌ Cancel
          </button>
        )}
      </div>

      {!editingEntry && (title || content) && (
        <div className={`auto-save ${isSaving ? 'saving' : ''}`}>
          {isSaving ? '💾 Auto-saving draft...' : '✅ Draft saved'}
        </div>
      )}
    </form>
  );
}
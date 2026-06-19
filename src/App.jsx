import { useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useLocalStorage } from './hook/useLocalStorage';
import ThemeToggle from './components/ThemeToggle';
import DiaryForm from './components/DiaryForm';
import SearchBar from './components/SearchBar';
import EntryList from './components/EntryList';
import StatsDashboard from './components/StatsDashboard';
import ConfirmModal from './components/ConfirmModal';
import { exportEntryAsText, formatDate } from './utils/exportUtils';
import './App.css';

function AppContent() {
  const [entries, setEntries] = useLocalStorage('diary-entries', []);
  const [draft, setDraft] = useLocalStorage('diary-draft', null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);
  const [viewingEntry, setViewingEntry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleSave = useCallback((entry) => {
    setEntries(prev => {
      const exists = prev.find(e => e.id === entry.id);
      if (exists) {
        return prev.map(e => e.id === entry.id ? entry : e).sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
      }
      return [entry, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    setEditingEntry(null);
    setViewingEntry(null);
  }, [setEntries]);

  const handleEdit = useCallback((entry) => {
    setEditingEntry(entry);
    setViewingEntry(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback(() => {
    if (!deleteId) return;
    setEntries(prev => prev.filter(e => e.id !== deleteId));
    setDeleteId(null);
    if (viewingEntry?.id === deleteId) setViewingEntry(null);
    if (editingEntry?.id === deleteId) {
      setEditingEntry(null);
      setDraft(null);
    }
  }, [deleteId, setEntries, viewingEntry, editingEntry, setDraft]);

  const handleDraftChange = useCallback((newDraft) => {
    setDraft(newDraft);
  }, [setDraft]);

  const handleExport = (entry) => {
    exportEntryAsText(entry);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="top-bar">
          <ThemeToggle />
        </div>

        <header className="header">
          <span className="header-icon">📔</span>
          <h1>My Personal Diary</h1>
          <p>Capture your thoughts, one day at a time</p>
        </header>

        <StatsDashboard entries={entries} />

        <DiaryForm
          onSave={handleSave}
          editingEntry={editingEntry}
          onCancelEdit={() => setEditingEntry(null)}
          draft={draft}
          onDraftChange={handleDraftChange}
        />

        {viewingEntry ? (
          <div className="full-entry animate-fade-in">
            <div className="full-entry-header">
              <h2>{viewingEntry.title}</h2>
              <div className="full-entry-meta">
                <span>📅 {formatDate(viewingEntry.date)}</span>
                {viewingEntry.mood && <span>{viewingEntry.mood} Mood</span>}
                <span>📝 {viewingEntry.content.split(/\s+/).filter(w => w).length} words</span>
              </div>
            </div>
            <div className="full-entry-content">{viewingEntry.content}</div>
            <div className="full-entry-actions">
              <button className="btn btn-secondary" onClick={() => setViewingEntry(null)}>
                ← Back to Entries
              </button>
              <button className="btn btn-primary" onClick={() => handleEdit(viewingEntry)}>
                ✏️ Edit
              </button>
              <button className="btn export-btn" onClick={() => handleExport(viewingEntry)}>
                📥 Export
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="entries-section">
              <div className="section-header">
                <h2 className="section-title">📖 Previous Entries</h2>
                <span className="entry-count">{entries.length} total</span>
              </div>
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <EntryList
                entries={entries}
                onView={setViewingEntry}
                onEdit={handleEdit}
                onDelete={setDeleteId}
                searchTerm={searchTerm}
              />
            </div>
          </>
        )}

        <ConfirmModal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
          title="Delete Entry?"
          message="This action cannot be undone. Are you sure you want to delete this diary entry?"
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
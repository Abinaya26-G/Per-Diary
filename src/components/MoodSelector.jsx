const MOODS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😤', label: 'Angry' },
  { emoji: '🤩', label: 'Excited' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🤔', label: 'Thoughtful' },
];

export default function MoodSelector({ selected, onSelect }) {
  return (
    <div className="form-group">
      <label className="form-label">How are you feeling?</label>
      <div className="mood-selector">
        {MOODS.map((mood) => (
          <button
            key={mood.label}
            type="button"
            className={`mood-btn ${selected === mood.emoji ? 'selected' : ''}`}
            onClick={() => onSelect(selected === mood.emoji ? '' : mood.emoji)}
            title={mood.label}
          >
            <span>{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
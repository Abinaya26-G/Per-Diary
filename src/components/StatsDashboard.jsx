import { getWordCount } from '../utils/exportUtils';

export default function StatsDashboard({ entries }) {
  const totalEntries = entries.length;
  const totalWords = entries.reduce((sum, e) => sum + getWordCount(e.content), 0);
  const totalChars = entries.reduce((sum, e) => sum + e.content.length, 0);
  
  const moodCounts = entries.reduce((acc, e) => {
    if (e.mood) acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});
  
  const mostFrequentMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '📝';

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = entries.find(e => e.date === today);
  const streak = calculateStreak(entries);

  function calculateStreak(entries) {
    if (entries.length === 0) return 0;
    const dates = [...new Set(entries.map(e => e.date))].sort().reverse();
    let streak = 0;
    let checkDate = new Date();
    
    for (const dateStr of dates) {
      const date = new Date(dateStr);
      const diff = Math.floor((checkDate - date) / (1000 * 60 * 60 * 24));
      if (diff <= 1) {
        streak++;
        checkDate = new Date(date);
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  const stats = [
    { icon: '📖', value: totalEntries, label: 'Entries' },
    { icon: '✍️', value: totalWords.toLocaleString(), label: 'Words' },
    { icon: '📊', value: totalChars.toLocaleString(), label: 'Characters' },
    { icon: '🔥', value: streak, label: 'Day Streak' },
    { icon: todayEntry ? '✅' : '❌', value: todayEntry ? 'Done' : 'Pending', label: "Today's Entry" },
    { icon: mostFrequentMood, value: mostFrequentMood, label: 'Top Mood' },
  ];

  return (
    <div className="stats-dashboard">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
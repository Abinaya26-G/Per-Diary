export function exportEntryAsText(entry) {
  const content = `
${'='.repeat(50)}
  ${entry.title}
${'='.repeat(50)}

Date: ${formatDate(entry.date)}
Mood: ${entry.mood || 'Not specified'}
Words: ${entry.content.trim().split(/\s+/).filter(w => w).length}
Characters: ${entry.content.length}

${'-'.repeat(50)}

${entry.content}

${'-'.repeat(50)}
Exported from My Personal Diary
`.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${entry.title.replace(/\s+/g, '_')}_${entry.date}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getWordCount(text) {
  return text.trim().split(/\s+/).filter(w => w).length;
}

export function getCharCount(text) {
  return text.length;
}
import React from 'react';

export function useAutoSave(value, key, delay) {
  var saveDelay = delay || 2000;
  var isSavingState = React.useState(false);
  var isSaving = isSavingState[0];
  var setIsSaving = isSavingState[1];

  var lastSavedState = React.useState(null);
  var lastSaved = lastSavedState[0];
  var setLastSaved = lastSavedState[1];

  var timeoutRef = React.useRef(null);

  React.useEffect(function() {
    setIsSaving(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(function() {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setIsSaving(false);
        setLastSaved(new Date());
      } catch (err) {
        console.error('Auto-save failed:', err);
        setIsSaving(false);
      }
    }, saveDelay);

    return function cleanup() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, key, saveDelay]);

  return {
    isSaving: isSaving,
    lastSaved: lastSaved
  };
}
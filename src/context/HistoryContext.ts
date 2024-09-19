import { useState } from 'react';
import { useAppContext } from './AppContext';

// Define a interface para o contexto
export interface HistoryContextProps {
  history: string[];
  addValueToHistory: (value: string) => void;
  clearHistory: () => void;
}


// Hook para usar o contexto
export const useHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  const addValueToHistory = (value: string) => {
    setHistory(prevHistory => [...prevHistory, value]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addValueToHistory,
    clearHistory
  }

};

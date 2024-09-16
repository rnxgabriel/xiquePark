import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// Define a interface para o contexto
export interface HistoryContextProps {
  history: string[];
  addValueToHistory: (value: string) => void;
  clearHistory: () => void;
}

// Cria o contexto com valores padrão
const HistoryContext = createContext<HistoryContextProps | undefined>(undefined);

// Hook para usar o contexto
export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory deve ser usado dentro de um HistoryProvider');
  }
  return context;
};

// Provedor do contexto
export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);

  // Função para adicionar um valor ao histórico
  const addValueToHistory = (value: string) => {
    setHistory(prevHistory => [...prevHistory, value]);
  };

  // Função para limpar o histórico
  const clearHistory = () => {
    setHistory([]);
  };

  const contextValue = useMemo(() => ({
    history,
    addValueToHistory,
    clearHistory
  }), [history]);

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
};

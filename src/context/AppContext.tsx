import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ActiveCarContextProps, useActiveCar } from './ActiveCarContext';
import { CarsContextProps, useCars } from './CarsContext';
import { HistoryContextProps, useHistory } from './HistoryContext';
import { StoreContextProps, useStore } from './StoreContext';

// Interface do AppContext com todos os outros contexts
interface AppContextProps extends
  ActiveCarContextProps,
  CarsContextProps,
  HistoryContextProps,
  StoreContextProps { }

// Cria o contexto com tipagem
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Custom hook para acessar o AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Hooks individuais
  const activeCar = useActiveCar();
  const cars = useCars();
  const history = useHistory();
  const store = useStore();

  // Memoiza o valor para evitar renderizações desnecessárias
  const value = useMemo(
    () => ({
      ...activeCar,
      ...cars,
      ...history,
      ...store,
    }),
    [activeCar, cars, history, store] // Dependências, atualize apenas se uma delas mudar
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

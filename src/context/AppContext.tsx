import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ActiveCarContextProps, useActiveCar } from './ActiveCarContext';
import { CarsContextProps, useCars } from './CarsContext';
import { HistoryContextProps, useHistory } from './HistoryContext';
import { StoreContextProps, useStore } from './StoreContext';
import useUser, { UserContextProps } from './UserContext';

// Interface do AppContext com todos os outros contexts
interface AppContextProps extends
  ActiveCarContextProps,
  CarsContextProps,
  HistoryContextProps,
  StoreContextProps,
  UserContextProps {
  }

// Cria o contexto com tipagem
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Custom hook para acessar o AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('para utilizar useAppContext o mesmo deve estar dentro de AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Hooks individuais
  const activeCar = useActiveCar();
  const cars = useCars();
  const history = useHistory();
  const store = useStore();
  const user = useUser();

  // Memoiza o valor para evitar renderizações desnecessárias
  const value = useMemo(
    () => ({
      ...activeCar,
      ...cars,
      ...history,
      ...store,
      ...user,
    }),
    [activeCar, cars, history, store, user] // Dependências, atualize apenas se uma delas mudar
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

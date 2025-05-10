import {setupApiInterceptors} from '@/services/api';
import React from 'react';

interface ErrorContextData {
  tooltipeError: ErrorProps;
  loading: boolean;
  showTooltipeError(props: ErrorProps): void;
  hideTooltipeError(): void;
  setLoading(props: boolean): void;
}

interface ErrorProps {
  message: string;
  visible: boolean;
}

const ErrorContext = React.createContext<ErrorContextData>(
  {} as ErrorContextData,
);

interface ErrorProviderProps {
  children: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({children}) => {
  const [tooltipeError, setTooltipeError] = React.useState<ErrorProps>({
    message: '',
    visible: false,
  });

  const [loading, setLoading] = React.useState(false);

  const showTooltipeError = React.useCallback((props: ErrorProps) => {
    setTooltipeError(props);
  }, []);

  const hideTooltipeError = () => {
    setTooltipeError({
      message: '',
      visible: false,
    });
  };

  React.useEffect(() => {
    setupApiInterceptors(showTooltipeError, setLoading);
  }, [showTooltipeError]);

  return (
    <ErrorContext.Provider
      value={{
        tooltipeError,
        loading,
        showTooltipeError,
        hideTooltipeError,
        setLoading,
      }}>
      {children}
    </ErrorContext.Provider>
  );
};

export function useError(): ErrorContextData {
  const context = React.useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

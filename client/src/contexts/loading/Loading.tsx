import React, { createContext, useState } from "react";

interface iLoadingContext {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const startingValue: iLoadingContext = {
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {}
};

export const LoadingContext = createContext(startingValue);

export const LoadingContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const valuesToPass: iLoadingContext = {
    isLoading,
    startLoading,
    stopLoading
  };

  return (
    <LoadingContext.Provider value={{ ...valuesToPass }}>
      {children}
    </LoadingContext.Provider>
  );
};

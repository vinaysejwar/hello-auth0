
"use client";
import Loader from "@/component/Loader";
import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextProps {
  loader: boolean;
  updateLoader: (bool: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loader, setLoader] = useState<boolean>(false);

  const updateLoader = (bool: boolean) => {
    setLoader(bool);
  };

  return (
    <LoadingContext.Provider value={{ loader, updateLoader }}>
      {loader && <Loader />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

export const useLoadingProvider = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingProvider must be used within a LoadingProvider");
  }
  return context;
};

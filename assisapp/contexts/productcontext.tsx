"use client";

import { createContext, useEffect, useState } from "react";

type PullDataContextType = {
  product: any[];
  setProduct: React.Dispatch<React.SetStateAction<any[]>>;
};

export const PullDataContext = createContext<PullDataContextType | undefined>(
  undefined
);

export const PullDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProduct] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(json => {
        if (json.success) setProduct(json.data);
      });
  }, []);

  return (
    <PullDataContext.Provider value={{ product, setProduct }}>
      {children}
    </PullDataContext.Provider>
  );
};

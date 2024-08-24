import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStockDetailApi } from "@/api/stock-picks";
import { useRouter } from "next/router";

// Create a context
const StockDetailsContext = createContext();

// Create a provider component for the StockDetails context
export const StockDetailsProvider = ({ children }) => {
  const router = useRouter();
  const { slug } = router.query;

  // Fetch stock details using react-query
  const {
    data: items = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stockDetail", slug],
    queryFn: () => getStockDetailApi({ stockId: slug }),
    enabled: !!slug, // Only run the query if slug is present
  });

  return (
    <StockDetailsContext.Provider value={{ items, isLoading, error }}>
      {children}
    </StockDetailsContext.Provider>
  );
};

// Custom hook to use the StockDetails context
export const useStockDetails = () => useContext(StockDetailsContext);

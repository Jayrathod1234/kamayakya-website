import { createContext, useContext, useState } from "react";

// Create a context
const NavBarContext = createContext();

// Create a provider component for the StockDetails context
export const NavBarProvider = ({ children }) => {
  const [showFilterHeader, setShowFilterHeader] = useState(false);

  return (
    <NavBarContext.Provider value={{ showFilterHeader, setShowFilterHeader }}>
      {children}
    </NavBarContext.Provider>
  );
};

// Custom hook to use the StockDetails context
export const useNavBar = () => useContext(NavBarContext);

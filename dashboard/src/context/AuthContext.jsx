import { createContext, useState } from "react";

const AuthContext = createContext();

const ADMIN_PASSWORD = "Admin@0022";

export const AuthProvidor = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated");
    return authStatus === "true";
  });

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

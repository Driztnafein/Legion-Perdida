import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function onLogin(response) {
    console.log("User object on login:", response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    setUser(response.data);
  }

  function onLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function updateUser(updatedUser) {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  const value = {
    user,
    onLogin,
    onLogout,
    updateUser,  // Agrega esta línea
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
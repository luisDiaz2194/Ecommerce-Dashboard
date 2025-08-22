import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // 🚨 Temporal: valores fijos
    if (email === "admin@test.com" && password === "1234") {
      const fakeUser = { id: 1, email, role: "admin" };
      setUser(fakeUser);
      navigate("/dashboard");
    } else {
      alert("Credenciales inválidas");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

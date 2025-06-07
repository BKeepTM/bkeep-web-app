import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children } ) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("site") ||  "");
  const navigate = useNavigate();

  const login = async (data) => {
    try {
    axios.post(`${apiUrl}/users/login`, data).then((response) => {
  
      if (response.data) {
        setUsername(data.username);
        setToken(response.data.token);
        localStorage.setItem("site", response.data.token);
        console.log("response", response.data);
        return navigate("/home");
      }
      throw new Error(response.data.message);
    });
      
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUsername("");
    setToken("");
    localStorage.removeItem("site");
    return  navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
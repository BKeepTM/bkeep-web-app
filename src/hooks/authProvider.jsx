import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const apiUrl = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children } ) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("site") ||  "");
  const navigate = useNavigate();

 const login = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, data);

    if (response.data?.token) {
      setUsername(data.username);
      setToken(response.data.token);
      localStorage.setItem("site", response.data.token);
      navigate("/home");
    } else {
      throw new Error("Neveljaven odgovor");
    }
  } catch (err) {
   
    throw new Error("Napačno uporabniško ime ali geslo!");
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
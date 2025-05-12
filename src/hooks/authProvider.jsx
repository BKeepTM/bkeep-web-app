import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// export async function setStorageItemAsync(key: string, value: string | null) {
//   if (Platform.OS === 'web') {
//     try {
//       if (value === null) {
//         localStorage.removeItem(key);
//       } else {
//         localStorage.setItem(key, value);
//       }
//     } catch (e) {
//       console.error('Local storage is unavailable:', e);
//     }
//   } else {
//     if (value == null) {
//       await SecureStore.deleteItemAsync(key);
//     } else {
//       await SecureStore.setItemAsync(key, value);
//     }
//   }
// }

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
        return navigate("/");
      }
      throw new Error(response.data.message);
    });
      
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUsername("");
    setToken("");
    localStorage.removeItem("site");
    return  navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
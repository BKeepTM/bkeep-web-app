import { useContext, createContext, useState } from "react";
import { useNavigation, Redirect } from "expo-router";
import { Platform } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export interface User {
  token: string;
  username: string;
  login: (data: Object) => void;
  logOut: () => void;
  //user: any;
}
export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export const AuthContext = createContext<User>({} as User);

const AuthProvider = ({ children }: any) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("site") ||  "");
  const navigate = useNavigation();

  const login = async (data : any) => {
    try {
    axios.post(`${apiUrl}/users/login`, data).then((response) => {
  
      if (response.data) {
        setUsername(data.username);
        setToken(response.data.token);
        setStorageItemAsync("site", response.data.token);
        console.log("response", response.data);
        return <Redirect href="/(tabs)/(home)" />;
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
    setStorageItemAsync("site",null);
    return <Redirect href="/(auth)/register" />;
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

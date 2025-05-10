import { globalStyles } from '@/app/globalsStyles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View , Pressable} from 'react-native';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const payload = {
        username: username,
        password: password,
        }

        const handleLogin = async () => {
            try {
              const response = await axios.post(`${apiUrl}/users/login`, payload);
              const token = response.data.token;
          
              await AsyncStorage.setItem('auth_token', token);
              console.log('Token saved to storage');
            } catch (error) {
              console.error('Login failed:', error);
            }
          };

          // Funcija, ki pridobi token
          useEffect(() => {
            const getToken = async () => {
              const token = await AsyncStorage.getItem('auth_token');
              console.log('Saved token:', token);
            };
          
            getToken();
          }, []);



  return (
    <View style={globalStyles.container}>

      <TextInput 
      onChangeText={e => setUsername(e)}
      placeholder='Username'
      style = {globalStyles.input}
      value={username}
      />

      <TextInput 
      onChangeText={e => setPassword(e)}
      placeholder='Password'
      style = {globalStyles.input}
      value={password}
      />

      <Pressable style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </Pressable>

    </View>
  );
}
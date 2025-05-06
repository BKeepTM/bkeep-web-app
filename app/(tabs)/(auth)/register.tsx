import { globalStyles } from '@/app/globalsStyles';
import axios from 'axios';
import { useState } from 'react';
import { Text, View , StyleSheet, Pressable} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function Register() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")

  const payload = {
    username: username,
    password: password,
    email: email
  }

  console.log("payload", payload)

const handleRegister = () => {
  axios
  .post(`${apiUrl}/users/register`,payload)
}  


  return (
    <View style={globalStyles.container}>

      <TextInput 
      onChangeText={e => setEmail(e)}
      placeholder='Email'
      style = {globalStyles.input}
      value={email}
      />

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

      <Pressable style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Register</Text>
      </Pressable>

    </View>
  );
}

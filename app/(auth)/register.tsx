import { globalStyles } from '@/app/globalsStyles';
import axios from 'axios';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View , StyleSheet, Pressable,Image} from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import globalImages from '../globalImages';


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

  //console.log("payload", payload)

const handleRegister = () => {
  axios
  .post(`${apiUrl}/users/register`,payload)
}  


  return (
    <View style={globalStyles.mainView}>


      <View style={{display:'flex', flexDirection:'column', height:60, marginTop:110}}>
      <TextInput 
      style={{borderTopLeftRadius:20, borderTopRightRadius:20}}
      label={'Email'}
      onChangeText={e => setEmail(e)}
      value={email}
      />

      <TextInput 
      
      label={"Username"}
      onChangeText={e => setUsername(e)}
      value={username}
      />

      <TextInput 
      label={'Password'}
      secureTextEntry
      onChangeText={e => setPassword(e)}
      value={password}
      />

      <Button mode="outlined" textColor='black' onPress={handleRegister} style={{width: 270, height: 45, alignItems: 'center', borderTopLeftRadius:0, borderTopRightRadius:0 }}>      
          <Link href="/register">Ustvari račun</Link>
      </Button>
      </View>



        <View style={{ justifyContent: 'center', backgroundColor:"white", alignSelf:'stretch', borderTopLeftRadius:50, borderTopRightRadius: 50, height:300}}>
           <Image source={globalImages.beeHive}  style={{ width: 150,height: 220, resizeMode: 'contain', alignSelf: 'center'}} />
        </View>
  </View>
  );
}

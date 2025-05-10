import { globalStyles } from '@/app/globalsStyles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View , Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/hooks/authProvider';
import {Button, TextInput} from 'react-native-paper';
import {Image} from 'react-native'
import globalImages from '../globalImages';

export default function Login() {
    const auth = useAuth();
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const payload = {
        username: username,
        password: password,
        }

        const handleLogin = async () => {
          auth.login(payload);
          };
  return (
    <View style={globalStyles.mainView}>

      <View style={{flex:3, justifyContent: 'center', backgroundColor:"white", alignSelf:'stretch', borderBottomLeftRadius:50, borderBottomRightRadius: 50}}>
        <Image source={globalImages.beekeeper}  style={{ width: 150,height: 220, resizeMode: 'contain', alignSelf: 'center'}} />
      </View>

    <View style={{ flexDirection:'column',flex: 2,width: 270, alignSelf:'center', marginTop:50}}>
      <TextInput 
      style={{borderTopLeftRadius:20, borderTopRightRadius:20}}
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

      <Button mode="outlined" textColor='black' onPress={handleLogin} style={{width: 270, height: 45, alignItems: 'center', borderTopLeftRadius:0, borderTopRightRadius:0 }}>      
          Prijava
      </Button>
      </View>

    </View>
  );
}
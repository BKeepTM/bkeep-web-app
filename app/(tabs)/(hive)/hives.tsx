import { globalStyles } from '@/app/globalsStyles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View , StyleSheet, Pressable} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
 interface hive { // malo stupid da mora bit tak
  id: number;
  location: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
 }
export default function Hives() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [hives, setHives] = useState([{}] as hive[]);
    useEffect(() => {
    const fetchHives = async () => {
      try {
        axios.get(`${apiUrl}/hives`).then((response) =>{
            console.log(response.data);
            setHives(response.data);
        });
        
      } catch (error) {
        console.error(error);
      }
    }}, []);

  return (
    <View style={globalStyles.container}>
        {
            hives.map((hive) => {
                return (
                <View>
                  <Text>{hive.location}</Text>
                  <Text>{hive.name}</Text>
                  <Text>{hive.type}</Text>
                  <Text>{hive.status}</Text>
                </View>
            )
          })
        }
    </View>
  );
}

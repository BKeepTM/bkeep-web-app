import { globalStyles } from '@/app/globalsStyles';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'react-native';
import { Button , Card} from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { globalImages } from '../globalImages';

export default function Index() {
  return (
    <View style={globalStyles.mainView}>
    <View style={{flex: 7, justifyContent: 'center', backgroundColor:"white", alignSelf:'stretch', borderBottomLeftRadius:50, borderBottomRightRadius: 50}}>
        <Image source={globalImages.hive}  style={{ width: 150,height: 220, resizeMode: 'contain', alignSelf: 'center'}} />
          
          <Text style={globalStyles.title}><MaterialCommunityIcons name="bee" size={24} color="black" />Bzz Bzz<MaterialCommunityIcons name="bee" size={24} color="black" /></Text>
          <Text style={globalStyles.title}>Za uporabo se prijavi</Text>
    </View>
  
    <View style={{flex: 2, gap: 8, marginTop: 30}}>
        <Button mode="outlined"  textColor='black' style={{width: 270, height: 45, alignItems: 'center'}}>      
            <Link href="/register">Registracija</Link>
        </Button>
        <Button icon="login" mode="outlined" textColor='black'  style={{width: 270, height: 45, alignItems: 'center' }}>      
            <Link href="/login" >Prijava</Link>
        </Button>
    </View>
    </View>
  );
}




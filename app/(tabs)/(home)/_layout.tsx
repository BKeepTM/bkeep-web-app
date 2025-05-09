import { Stack } from 'expo-router';
import { Image } from 'react-native';


export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" options={{
        headerTitle: () => (
          <Image
            source={require('../../../assets/images/BkeepLogo.png')}
            style={{ width: 100, height: 65, resizeMode: 'contain' }}
          />
        ),
        contentStyle:{backgroundColor: "#fcdd9e"},
        headerStyle: {
          backgroundColor: "#f9e7cc",
        },
        headerTitleAlign: "center",
        
        }}/>
    </Stack>
  );
}

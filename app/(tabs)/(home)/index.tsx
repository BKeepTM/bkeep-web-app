import { globalStyles } from '@/app/globalsStyles';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Dobrodošli pri BKeep!</Text>
    </View>
  );
}

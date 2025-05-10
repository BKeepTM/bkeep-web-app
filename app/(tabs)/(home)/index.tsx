import { globalStyles } from '@/app/globalsStyles';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Index() {
  return (
    <>
    <Pressable style={globalStyles.button}>      
        <Link href="/register" style={globalStyles.title}>Register first!</Link>
    </Pressable>
    </>
  );
}


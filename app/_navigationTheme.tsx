import { Image } from 'react-native';

const logo = require('../assets/images/BkeepLogo.png');

export const defaultStack =  {
    headerTitle: () => (
        <Image
        source={logo}
        style={{ width: 100, height: 65, resizeMode: 'contain' }}
        />
    ),
    contentStyle:{backgroundColor: "#fcdd9e"},
    headerStyle: {
        backgroundColor: "#f9e7cc",
    },
    headerTitleAlign: "center",  
}as const

export const defaultTabs = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        position: 'absolute',
        elevation: 0,
        bottom: 25,
        left: 20,
        right: 20,
        borderRadius: 15,
        height: 90, 
        backgroundColor: '#fffceb',
        paddingBottom: 0
    },
    tabBarItemStyle: {
        alignItems: 'center',
        flexDirection: 'row',
    }
}as const

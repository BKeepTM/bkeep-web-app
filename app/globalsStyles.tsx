import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffceb',
    borderRadius: 10,
    marginTop: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black",
    alignSelf: 'center',
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#fffceb',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width:300,
  
    borderEndStartRadius: 20,
    borderStartEndRadius: 20,
    
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 22,
  },
  mainView:{
    flexDirection: 'column', justifyContent: 'space-between',
        alignItems: 'center', flex:1, backgroundColor: "#F6F0F0"
      }
});

export default globalStyles
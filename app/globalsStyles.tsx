import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffceb',
    borderRadius: 10,
    marginTop: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#A76545",
    alignSelf: 'center'
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
    backgroundColor: '#841584',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

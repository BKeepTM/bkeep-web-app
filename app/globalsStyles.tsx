import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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

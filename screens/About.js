
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';


export default function About({navigation}) {


  const handleLogout = async () => {
    try {
      const response = await fetch('http://10.20.0.88/coffeeshop/api/services/admin/administrador.php?action=logOut', {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        navigation.navigate('Home');
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Pantalla 2 </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}><Text style={styles.buttonText}>Cerrar Sesión</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderColor:"black",
    borderWidth:1,
    borderRadius:7,
    margin:10,
    paddingHorizontal: 10,
    width: 200
  },
  button:{
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    borderRadius: 10,
    backgroundColor: "darkblue",    
  },
  buttonText:{
    textAlign: "center",
    color: "white"
  }
});

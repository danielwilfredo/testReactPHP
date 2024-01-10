
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import fetchData from '../helpers/helpers'

export default function Home({ navigation }) {

  const [user, setUser] = useState("");
  const [pass, setPassword] = useState("");
/*
  const SIGNUP_FORM = {
    alias: user,
    clave: pass
  }

  const USER_API = 'services/admin/administrador.php';

  const handleLogin = async () => {
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar el primer usuario del sitio privado.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    console.log(DATA, "Antes del IF de ver si sirve DATA")
    if (DATA.status) {
        navigation.navigate('About')

    } else {
        console.log("Dio error")
        console.log(DATA)
    }
  }

  */

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('alias', user);
    formData.append('clave', pass);

    console.log(formData)

    try {
      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch('http://10.20.0.88/coffeeshop/api/services/admin/administrador.php?action=logIn', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        navigation.navigate('Categorias');
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
      <Text>Ingresar Usuario</Text>
      <TextInput style={styles.input} value={user} onChangeText={setUser} placeholder='Ej. User1234'/>

      <Text>Ingresar Contraseña</Text>
      <TextInput style={styles.input} value={pass} placeholder='Ej. Clave1234' onChangeText={setPassword} secureTextEntry={true} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Iniciar Sesión</Text></TouchableOpacity>
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
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    paddingHorizontal: 10,
    width: 200
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    borderRadius: 10,
    backgroundColor: "darkblue",
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});

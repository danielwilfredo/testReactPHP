
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import * as ImagePicker from 'react-native-image-picker';
//import * as DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'expo-image-picker';

export default function Categorias({ navigation }) {

    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [dataCategoria, setDataCategoria] = useState([]);
    const [imagen, setImagen] = useState(null);
    
    const options = { title: 'Selecciona una imagen', storageOptions: { skipBackup: true, path: 'images', }, };

    const handleCreate = async () => {

        console.log("Antes de crear el formData")
        console.log(imagen)
        const formData = new FormData();
        formData.append('nombreCategoria', categoria);
        formData.append('descripcionCategoria', descripcion);
        formData.append('imagenCategoria', imagen);

        try {
            //utilizar la direccion IP del servidor y no localhost
            const response = await fetch('http://10.20.0.88/coffeeshop/api/services/admin/categoria.php?action=createRow', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
            } else {
                console.log(data);
                // Alert the user about the error
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch en handle create errorazo:c");
            Alert.alert('Error', 'Ocurrió un error al intentar guardar' + error);
        }
    };


    const getCategorias = async () => {


        try {
            //utilizar la direccion IP del servidor y no localhost

            const response = await fetch('http://10.20.0.88/coffeeshop/api/services/admin/categoria.php?action=readAll', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            console.log(data)
            if (data.status) {
                setDataCategoria(data.dataset)
            } else {
                console.log(data);
                // Alert the user about the error
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar las categorias');
        }
    }

    useEffect(() => {
        getCategorias()
    }, []);

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
       
   /**
     const pickImage = async () => {
        try {
          const result = await ImagePicker.pick({
            type: [ImagePicker.types.images],
          });
    
          setImageSource(result);
        } catch (err) {
          if (ImagePicker) {
            Alert.alert('Canceled');
          } else {
            Alert.alert('Error', 'Error al seleccionar la imagen');
          }
        }
      };

    */
      const openGalery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [8, 8],
            quality: 1,
        });

        console.log("valor de result 1", result);

        if (!result.canceled) {
            console.log("En el if de !result.canceled")
            console.log("Valor de Result 2", result.assets)
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();
            
            setImagen(blob);

        }
        console.log("Valor de imagen copn blob supuestamente", imagen)
    };

    return (

        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Nuevo Registro</Text>
                        <View style={styles.container}>
                            <Text>Nombre Categoria</Text>
                            <TextInput style={styles.input}
                             value={categoria} 
                             onChangeText={setCategoria}
                              placeholder='Categoria...' />

                            <Text>Descripción Categoria</Text>
                            <TextInput style={styles.input} value={descripcion} 
                            placeholder='Descripcion...'
                             onChangeText={setDescripcion} />

                            <Text>Seleccionar imagen</Text>
                            <TouchableOpacity style={styles.loadImageButton} 
                            title="Escoge una foto de tu librería" 
                            onPress={openGalery}>
                        <Text style={styles.buttonText}>Cargar Imagen</Text>
                    </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleCreate}><Text style={styles.buttonText}>Crear nueva categoria</Text></TouchableOpacity>
                        </View>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Text style={styles.textStyle}>Categorias:</Text>
            {dataCategoria.map((categoria) => (
                <View>
                    <View style={styles.vista}>
                        <View key={categoria.id_categoria}>
                            <Text >{categoria.nombre_categoria}</Text>
                            <Text >{categoria.descripcion_categoria}</Text>
                        </View>

                    </View>
                </View>
            ))}

            <View>

            </View>

            <View style={styles.centeredView}>
                <TouchableOpacity
                    style={[styles.buttonCreate, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Crear una nueva categoria</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonGet]}
                    onPress={getCategorias}>
                    <Text style={styles.textStyle}>Probar consulta categorias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogout}><Text style={styles.buttonText}>Cerrar Sesión</Text></TouchableOpacity>
            </View>   
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, loadImageButton: {
        backgroundColor: "#b3b2b1",
        padding: 8,
        borderRadius: 10,
        width: "40%",
        justifyContent: "center",
        alignItems: "center"},
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
        marginTop: 25
    },
    buttonCreate: {
        borderWidth: 2,
        borderColor: "black",
        width: 200,
        borderRadius: 10,
        backgroundColor: "darkblue",
        marginTop: 100,
        height: 50,
        padding: 10
    },
    buttonGet: {
        borderWidth: 2,
        borderColor: "black",
        width: 200,
        borderRadius: 10,
        backgroundColor: "darkblue",
        marginTop: 100,
        height: 50,
        padding: 10
    },

    buttonText: {
        textAlign: "center",
        color: "white"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    vista:{
display:"flex",
        backgroundColor:"green",
       width:250,
       padding:15


    }


    
});


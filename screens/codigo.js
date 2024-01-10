//import * as ImagePic from 'react-native-document-picker'




const pickImage = async () => {
    try {
        const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });

        setSelectedFile(result);
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            Alert.alert('Canceled');
        } else {
            Alert.alert('Error', 'Error al seleccionar la imagen');
        }
    }
};

/*     const uploadImage = async () => {
 if (!selectedFile) {
   Alert.alert('Error', 'Por favor, seleccione una imagen primero');
   return;
 }
}*/

const openGalery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await DocumentPicker.launchImageLibraryAsync({
        mediaTypes: DocumentPicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [8, 8],
        quality: 1,
    });

    setImagen(result)

    if (!result.canceled) {
        setImagen(result.assets[0].uri);
    }

};

import React, { useState } from 'react'; 
import { View, Image, Button } from 'react-native';
 import ImagePicker from 'react-native-image-picker'; 
 const App = () => { 
    
    
  
}
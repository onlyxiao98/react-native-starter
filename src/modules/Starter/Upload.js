import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import axios from 'axios';

const Upload = () => {
  const [imageUri, setImageUri] = useState(null);

  // 拍摄图片
  const takePhoto = () => {
    launchCamera(
      { mediaType: 'photo' },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setImageUri(uri);
        }
      }
    );
  };

  // 上传图片
  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post('https://your-server-url/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        Alert.alert('Upload successful');
      } else {
        Alert.alert('Upload failed', response.data);
      }
    } catch (error) {
      console.error('Upload error', error);
      Alert.alert('Upload failed', error.message);
    }
  };
  const testPromise = () => {
    return new Promise((resolve, reject) => {
      if(true) {
        resolve('success')
      } else {
        reject('error')
      }
    });
  }
  const handlePromise = () => {
    testPromise().then((res)=>{console.log(res)})
  }
 
  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Take Photo" onPress={takePhoto} />
      <Button title="Upload Photo" onPress={uploadImage} />
      <TouchableOpacity onPress={handlePromise}>
        <Text>usePromise</Text>
      </TouchableOpacity>
      <TextInput inputMode='numeric' returnKeyType='send' style={styles.input} placeholder="Enter text" />
      <Text style={{fontSize: 20}} numberOfLines={1} ellipsizeMode='head'>1231234443423142452525254e345334563463464</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#999',
    height: 52,
  }
});

export default Upload;

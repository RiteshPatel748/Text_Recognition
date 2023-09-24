import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { useNavigation } from '@react-navigation/native';


const HomeScreen=()=> {
    const  navigation= useNavigation()
    const onGallery=async()=>{
        console.log("first")
        const result = await launchImageLibrary(()=>{});
        console.log(result?.assets[0]?.uri)
        let uri=result.assets[0]?.uri;
        navigation.navigate('TextRecognitionScreen',uri=String(uri))
    }
    const onCamera=async()=>{
        const result = await launchCamera(()=>{});
        console.log(result?.assets[0]?.uri)
        let uri=result.assets[0]?.uri;
        navigation.navigate('TextRecognitionScreen',uri=String(uri))

    }
  return (
    <View style={styles.Container}>
        <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',marginBottom:20,}}>Text Recognition</Text>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.button} onPress={onGallery}>
                <Image source={require('../assets/gallery.png')} style={styles.image}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onCamera}>
                <Image source={require('../assets/camera.png')} style={[styles.image,{width:80}]}></Image>
            </TouchableOpacity>
        </View>
            <TouchableOpacity style={[styles.button,{flexDirection:'row'}]} onPress={()=>{navigation.navigate('HistoryScreen')}}>
                <Image source={require('../assets/history.png')} style={[styles.image,{width:30,height:30,marginRight:10}]}></Image>
                <Text style={{fontSize:22,fontWeight:'bold'}}>View History</Text>
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
    //   flex:1,
      justifyContent:'center',
      alignItems:'center',
      width:"100%",
      height:"100%",
    },
    image:{
        width:100,
        height:100,
        resizeMode:'contain'
    },
    button:{
        margin:40,
        marginBottom:30,
    },
  });
export default HomeScreen;
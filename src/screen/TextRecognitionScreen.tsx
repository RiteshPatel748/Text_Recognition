import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity ,ToastAndroid, Image, View } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import TranslateText, {TranslateLanguage,} from '@react-native-ml-kit/translate-text';
import Clipboard from '@react-native-clipboard/clipboard';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextRecognitionScreen=()=> {
    const [text,setText]=useState('');
    const [transText,setTransText]=useState('');
    const [loading,setLoading]=useState(false);
    const route=useRoute()
    const url=route.params;

    const fetch=async()=>{
        console.log("first")
        const text = await TextRecognition.recognize(url);
        // console.log(text)
        console.log(text?.text)
        await AsyncStorage.setItem(url, JSON.stringify({text:text?.text,url:url}))
        setText(text?.text)
    }
    const onCopy=(text)=>{
        Clipboard.setString(text);
        ToastAndroid.show('Copy', 1000);
    }
    const onSound=(text)=>{
        Tts.speak(text);
    }
    const onTranslate=async()=>{
        setLoading(true)
        const translatedText = await TranslateText.translate({
            text: text,
            sourceLanguage: TranslateLanguage.ENGLISH,
            targetLanguage: TranslateLanguage.HINDI,
            downloadModelIfNeeded: true,
          });
          console.log(translatedText);
          setTransText(translatedText);
          setLoading(false)
    }
    useEffect(()=>{
        fetch();
    },[])
  return (
    <View style={styles.Container}>
        <ScrollView style={{marginTop:20}}>
            <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',marginBottom:20}}>Text Recognition</Text>
            <Image source={{uri:url}} style={styles.image}></Image>
            <View style={styles.box}>
                <View>
                    <Text style={styles.text}> 
                        {text}
                    </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={onTranslate}>
                        <Image source={require('../assets/translate.png')} style={styles.imageSmall}></Image>   
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onSound(text)}>
                        <Image source={require('../assets/sound.jpg')} style={styles.imageSmall}></Image>   
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onCopy(text)}>
                        <Image source={require('../assets/copy.png')} style={styles.imageSmall}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            {transText&&<View style={styles.box}>
                <View>
                    <Text style={styles.text}> 
                        {transText}
                    </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={()=>onSound(transText)}>
                        <Image source={require('../assets/sound.jpg')} style={styles.imageSmall}></Image>   
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onCopy(transText)}>
                        <Image source={require('../assets/copy.png')} style={styles.imageSmall}></Image>
                    </TouchableOpacity>
                </View>
            </View>}
           {loading&&<Text style={{fontSize:20,fontWeight:'400',textAlign:'center',marginTop:30}}>Loading....</Text>}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      width:"100%",
      height:"100%",
    },
    box:{
        borderWidth:1,
        borderRadius:10,
        padding:5,
        margin:6,
        // borderColor:'#000'
    },
    image:{
        width:300,
        height:200,
        resizeMode:'contain',
        borderRadius:10,
        marginBottom:30,
        alignSelf:'center',
        marginTop:10
    },
    imageSmall:{
        width:30,
        height:30,
        resizeMode:'contain',
        borderRadius:10,
        alignSelf:'center',
        marginHorizontal:10,
    },
    text:{
        fontSize: 14 ,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 3, 
        marginLeft: 25, 
        marginBottom: 17
    }
  });
export default TextRecognitionScreen;
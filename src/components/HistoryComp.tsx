import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image, Dimensions } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HistoryComp=({data}:any)=> {
    const  navigation= useNavigation()
    const [url,setUrl]=useState()
    const [text,setText]=useState()
    // const url=`file:///data/user/0/com.textrecognition/cache/rn_image_picker_lib_temp_fc6a7698-9fae-4eee-8825-fda23cba8bad.jpg`;

    const onClick=async()=>{
        navigation.navigate('TextRecognitionScreen',uri=String(url))
    }

    useEffect(async()=>{
      const jsonValue = await AsyncStorage.getItem(data)
      const item=JSON.parse(jsonValue);
      setText(item.text);
      setUrl(item.url)
      console.log()
    }
    ,[])
    
  return (
    <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginBottom:-30}}>
      <TouchableOpacity style={{flexDirection:'row',borderWidth:1,borderRadius:10,padding:0,width:Dimensions.get('window').width-20,marginRight:10,marginVertical:10,}} onPress={onClick}>
        <View style={{}}>
          <Image
            source={{uri:url}}
            style={styles.image}/>
        </View>
        <View style={{flex:1}}>
            <Text style={{flex:1,fontSize:Dimensions.get('window').fontScale+14,textAlign:'center',textAlignVertical:'center',padding:10,flexWrap:'wrap'}} numberOfLines={5}>
              {text}
            </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={async()=>{await AsyncStorage.removeItem(url);navigation.navigate('HomeScreen');}}>
            <Text style={{color:'red',fontWeight:'500',fontSize:20,marginRight:20,zIndex:3,top:-40}}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    Container: {
      flex:1,
      // justifyContent:'center',
      alignItems:'center',
      width:"100%",
      height:"100%",
    },
    image:{
        width:140,
        height:140,
        resizeMode:'contain',
        borderRadius:10,
    },
   
  });
export default HistoryComp;
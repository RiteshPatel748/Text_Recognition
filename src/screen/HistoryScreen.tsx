import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image, ScrollView,Dimensions } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { useNavigation } from '@react-navigation/native';
import HistoryComp from '../components/HistoryComp';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HistoryScreen=()=> {
    const  navigation= useNavigation()
    const [items,setItems]=useState([])
    useEffect(async()=>{
      const keys = await AsyncStorage.getAllKeys()
      setItems(keys);
    }
    ,[])
  return (
    <View style={styles.Container}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 30,
        }}>
        Text Recognition
      </Text>
      <ScrollView style={{margin:0,}}>
        {
          items.map((data)=>{
            return(<HistoryComp data={data}/>)
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    Container: {
      alignItems:'center',
      margin:10,
      width:Dimensions.get('window').width,
      marginBottom:50,
      paddingBottom:10
    },

  });
export default HistoryScreen;
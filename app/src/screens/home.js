import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';





export default function Home() {
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        A: require('../assets/fonts/a.ttf'),

      });
    const [wallet, setWallet] = useState('1234 ••••••••••••••')
    const [balance, setBalance] = useState('10518')
    const [tx, setTx] = useState([{id:1,date:'10/01/2021',time:'01:10 AM', description:'Walmart POS', amount:200, debit:true},
    {id:2,date:'11/01/2021',time:'02:22 AM', description:'Amazon Refund', amount:200, debit:false},
    {id:3,date:'11/02/2021',time:'01:12 AM', description:'Amazon Refund', amount:430, debit:false},
    {id:4,date:'11/03/2021',time:'04:32 PM', description:'Walgreens POS', amount:120, debit:true},
    {id:5,date:'11/04/2021',time:'05:25 AM', description:'Amazon Refund', amount:260, debit:false},
    {id:6,date:'11/05/2021',time:'01:42 PM', description:'Walmart POS', amount:146, debit:true},])
    const txList = tx.map((data) => {
        return (
          <View style={{backgroundColor:`${data.debit ?  "#6FEDB7" : "#2DD881" }`, width:'90%', alignSelf:'center', borderRadius:10, paddingLeft:'5%', paddingVertical:'5%', flexDirection:'row', display:'flex', marginVertical:'1.5%'}}>
              <Text style={{fontFamily:'A', fontSize:12, textAlignVertical:'center', color:'#FFF'}}>{data.date} </Text>
              <Text style={{fontFamily:'A', fontSize:12, textAlignVertical:'center', color:'#FFF'}}>{data.time}      </Text>
              <Text style={{fontFamily:'A', fontSize:17, textAlignVertical:'center', color:'#FFF'}}>{data.description}</Text>
              <Text style={{fontFamily:'A', fontSize:20, textAlignVertical:'center', color:'#FFF', textAlign:'right'}}>      {data.debit ? '-':' '}${data.amount}</Text>
              </View>
        )
      })

      if (!fontLoaded) {
        return null;
      }
      
    
   
    return (
        <View style={styles.container}>
            <View style={{ alignSelf:'center', marginTop:'15%', backgroundColor:'#2DD881', width:'90%', borderRadius:10 }}>
              <View style={{marginHorizontal:'5%', marginTop:'5%', marginBottom:'15%'}}>
                <Text style={{fontFamily:'A', fontSize:25, color:'#FFF', textAlign:'left', marginLeft:'5%'}}>John Doe</Text>
                <Text style={{fontFamily:'A', fontSize:15, color:'#FFF', textAlign:'left', marginLeft:'5%'}}>{wallet}</Text>
                <Text style={{fontFamily:'A', fontSize:35, color:'#FFF', textAlign:'center', marginTop:'10%'}}>${balance}</Text>
                <Text style={{fontFamily:'A', fontSize:15, color:'#FFF', textAlign:'center', marginTop:'5%'}}>wallet balance</Text>
              </View>
            </View>
            <TouchableOpacity><View style={{backgroundColor:"#1C0B19", width:'90%', alignSelf:'center', marginTop:'2.5%', borderRadius:5}}>
                <Text style={{fontFamily:'A', textAlign:'center', color:'#FFF', paddingVertical:'5%'}} onPress={()=>navigation.navigate('Pay')}>Pay with ecoin</Text></View></TouchableOpacity>
                <View>
                <Text style={{fontFamily:'A', fontSize:17, marginTop:'5%', marginLeft:'5%'}}>Transaction History</Text>
                <View style={{height:'70%'}}><ScrollView>{txList}</ScrollView></View>
                </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: '#FFF'
    },
    header: {
        height: '55%',
        width: '100%',
        marginTop: '-5%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});
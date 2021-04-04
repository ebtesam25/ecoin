import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { BarCodeScanner } from 'expo-barcode-scanner';






export default function Pay() {
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        A: require('../assets/fonts/a.ttf'),

      });
      const [hasPermission, setHasPermission] = useState(null);
      const [scanned, setScanned] = useState(false);
      const [wallet, setWalletAddress] = useState('');
      const [name, setName] = useState('');
      const [amount, setAmount] = useState('');
      const [confirm, setConfirm] = useState(false);
    const [location, setLocation] = useState(null);
      useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          const { statusB } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(statusB === 'granted');
          if (status !== 'granted') {
            setErrorMsg('Permission Denied');
            return;
          }
         
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log(location)
        })();
      }, []);
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        let res = JSON.parse(data);
        setWalletAddress(res.address);
        setName(res.name);
        setAmount(res.amount);
        console.log(data);
        console.log(JSON.parse(data));
      };

      if (!fontLoaded) {
        return null;
      }
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
    
    
   
    return (
        <View style={styles.container}>
            <View style={{ alignSelf:'center', marginTop:'25%' }}>
            <Image source={require('../assets/logo.png')} style={{width:100, height:100, resizeMode:'contain', alignSelf:'center'}}></Image>
              <View style={{alignSelf:'center'}}>
                <Text style={{fontFamily:'A', fontSize:40, color:'#000', textAlign:'center'}}>ecoin</Text>
                {!scanned &&<><Text style={{fontFamily:'A', fontSize:15, color:'#000', textAlign:'center', marginTop:'5%'}}>Scan recipient's QR Code to transfer funds</Text>
                <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{width:500, height:400}}
      /></>}
      {scanned && !confirm &&<><Text style={{fontFamily:'A', fontSize:15, textAlign:'center', marginTop:'15%'}}>Wallet Address (Recipient):{wallet}</Text>
      <Text style={{fontFamily:'A', fontSize:15, textAlign:'center'}}>Name (Recipient):{name}</Text>
      <Text style={{fontFamily:'A', fontSize:15, textAlign:'center'}}>Amount:{amount}</Text>
      <TouchableOpacity><View style={{backgroundColor:'#2DD881', borderRadius:10, paddingVertical:'5%', marginTop:'25%'}}><Text style={{fontFamily:'A', fontSize:14, textAlign:'center', color:'#FFF'}} onPress={()=>{setConfirm(true)}}>CONFIRM</Text></View></TouchableOpacity></>}
      {confirm && <Text style={{fontFamily:'A', fontSize:15, color:'#2DD881', textAlign:'center', marginTop:'5%'}}>Thank you!</Text>}
              </View>
              
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
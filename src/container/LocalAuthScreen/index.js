import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { LinearGradient } from "expo-linear-gradient";
import { getAsyncStorage, keys } from "../../asyncStorage";


const LocalAuthPin = ({navigation}) => {
  useEffect( () => {
    (async () => {
      const type = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if(type != []) {
        const save = await LocalAuthentication.isEnrolledAsync();
        if (save == true) {
          const authenticate = await LocalAuthentication.authenticateAsync();
          console.log(authenticate,'=================================================')
          if (authenticate.success) {
            console.log(authenticate.success,'=================================================')
            getAsyncStorage(keys.pin).then(pin => {
              console.log(pin,'====ppppppppp')
              if (pin) {
                navigation.navigate('BottomTab');
              } else {
                navigation.navigate('Pincode');
              }
            }).catch(err => {
              console.log(err);
            })
          } else if (authenticate.error == 'lockout'){
            navigation.navigate('Pincode');
          } else {
            navigation.navigate('Login');
          }
        } else{
          navigation.navigate('Pincode');
        }
      } else {
        navigation.navigate('Pincode');
      }
    })()
  }, [navigation]);
  
    return (
        <LinearGradient
        colors={['#2c1845','#120324','#0d011c']}
        style={styles.container}
        start={[0,0.9]}
        end={[0.9,0.1]}
      />
    );
  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


export default LocalAuthPin;


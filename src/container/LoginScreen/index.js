import React, { useEffect, useState, useRef } from "react";
import * as Translator from "../../localization/";
import {
  StyleSheet,
  Image,
  StatusBar,
  View,
  ImageBackground,
} from "react-native";
import { InputField, Logo, RoundCornerButton } from "../../component";
import { color, HEIGHT, WIDTH } from "../../utility";
import { getAsyncStorage, keys } from "../../asyncStorage";
import Constants from "expo-constants";
import { defaultCountryCode } from "../../utility/constants";

const statusHeight = StatusBar.currentHeight;
//TODO: update locale from radio option and get from props here
//const locale = "en-US"
const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [locale, setLang] = useState("");
  Translator.default(locale, true);
  useEffect(() => {
    getAsyncStorage(keys.lang)
      .then((res) => {
        setLang(res);
      })
      .catch((err) => {});
  }, [locale]);

  const onLoginPress = async () => {
    if (!phone && phone == "") {
      alert("Field Should be Not Empty!");
    } else {
      try {
        navigation.navigate("Verify", { phoneNumber: phone });
      } catch (error) {
        alert(error);
      }
    }
  };
  // // Function to be called when requesting for a verification code
  // const sendVerification = () => {
  //   const phoneProvider = new firebase.auth.PhoneAuthProvider();
  //   console.log(phoneProvider,'===============p',phoneProvider.isOAuthProvider)
  //   phoneProvider
  //     .verifyPhoneNumber(phone, recaptchaVerifier.current)
  //     .then(res => console.log(res,'=====rrrrrrrr'));
  //     // vid => navigation.navigate('Verify',{code: vid})
  // };
  return (
    <>
      <StatusBar backgroundColor={color.DARK_PURPL} />
      <ImageBackground
        source={require("../../../assets/images/bgimg.png")}
        resizeMode="stretch"
        style={[
          styles.container,
          { alignSelf: "center", width: WIDTH, height: HEIGHT },
        ]}
      >
        {/* <LinearGradient
        // Background Linear Gradient
        colors={['#2c1845','#120324','#0d011c']}
        style={styles.container}
        start={[0,0.9]}
        end={[0.9,0.1]}
        > */}
        <Logo
          imgStyle={{ width: 250, height: 100 }}
          logoStyle={{
            width: 250,
            height: 100,
            margin: 20,
            alignSelf: "center",
          }}
        />
        <Image
          source={require("../../../assets/images/cameroon.png")}
          style={{ height: 40, width: 40, marginLeft: "15%", marginTop: "10%" }}
        />
        <InputField
          placeholder={Translator.getString("mobileNumberLabel")}
          value={phone}
          onChangeText={(input) => setPhone(input)}
          keyboardType={"phone-pad"}
          inputStyle={{ backgroundColor: "transparent", width: "70%" }}
        />
        <RoundCornerButton
          title={Translator.getString("loginLabel")}
          btnStyle={{ alignSelf: "center" }}
          onPress={onLoginPress}
        />
        {/* </LinearGradient> */}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#380638",
    paddingTop: statusHeight == undefined ? 20 : statusHeight,
  },
  subContainer: {
    marginHorizontal: "10%",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  txt: {
    color: color.WHITE,
    fontSize: 18,
    paddingLeft: 5,
    paddingBottom: 10,
  },
});

export default LoginScreen;

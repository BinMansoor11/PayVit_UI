import React, { useEffect, useState, useRef } from "react";
import * as Translator from "../../localization/";
import { StyleSheet, Image, StatusBar, ImageBackground } from "react-native";
import { InputField, Logo, RoundCornerButton } from "../../component";
import { color, HEIGHT, WIDTH } from "../../utility";
import { LinearGradient } from "expo-linear-gradient";
import { getAsyncStorage, keys, setAsyncStorage } from "../../asyncStorage";
import { setCurrentUser, setCurrentUserID } from "../../appData";

const statusHeight = StatusBar.currentHeight;
//TODO: update locale from radio option and get from props here
//const locale = "en-US"
const VerifyScreen = ({ navigation, route }) => {
  const [locale, setLang] = useState("");
  const phoneNumber = route.params.phoneNumber;
  // console.log(verificationId,'id============',route)
  Translator.default(locale, true);
  useEffect(() => {
    getAsyncStorage(keys.lang)
      .then((res) => {
        setLang(res);
      })
      .catch((err) => {});
  }, [locale]);

  const [code, setCode] = useState("");

  // Function to be called when confirming the verification code that we received
  // from Firebase via SMS
  const confirmCode = async () => {
    let userID = "test";
    setCurrentUserID(userID);

    let userData = {
      phoneNumber: phoneNumber,
    };
    setCurrentUser(userData, userID);
    if (userData && userData != null && userData.firstName) {
      setAsyncStorage(keys.loggedInUserID, userID);
      navigation.replace("LocalAuth");
    } else {
      navigation.replace("NewUser");
    }
  };
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
        <Logo
          imgStyle={{ width: 250, height: 100 }}
          logoStyle={{
            width: 250,
            height: 100,
            margin: 20,
            alignSelf: "center",
          }}
        />
        <InputField
          placeholder={Translator.getString("verifyPinLabel")}
          value={code}
          onChangeText={(input) => setCode(input)}
          keyboardType={"phone-pad"}
          inputStyle={{ backgroundColor: "transparent", width: "70%" }}
        />
        <RoundCornerButton
          title={Translator.getString("verifyLabel")}
          btnStyle={{ alignSelf: "center" }}
          onPress={confirmCode}
        />
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

export default VerifyScreen;

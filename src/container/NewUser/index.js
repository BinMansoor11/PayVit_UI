import React, { useEffect, useState, useRef } from "react";
import * as Translator from "../../localization/";
import {
  StyleSheet,
  Image,
  StatusBar,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { InputField, Logo, Profile, RoundCornerButton } from "../../component";
import { color, HEIGHT, WIDTH } from "../../utility";
import { getAsyncStorage, keys } from "../../asyncStorage";
import * as ImagePicker from "expo-image-picker";
import { currentUser, currentUserID } from "../../appData";

const statusHeight = StatusBar.currentHeight;
//TODO: update locale from radio option and get from props here
//const locale = "en-US"
const NewUser = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  let [selectedImage, setSelectedImage] = useState("");
  const [locale, setLang] = useState("");
  Translator.default(locale, true);
  useEffect(() => {
    getAsyncStorage(keys.lang)
      .then((res) => {
        setLang(res);
      })
      .catch((err) => {});
  }, [locale]);

  const onUpdatePress = () => {
    // if(!phone && phone == ''){
    //   alert('Field Should be Not Empty!');
    // } else
    if (!fName && fName == "") {
      alert("Field Should be Not Empty!");
    } else if (!lName && lName == "") {
      alert("Field Should be Not Empty!");
    } else {
      currentUser.firstName = fName;
      currentUser.lastName = lName;
      currentUser.profileImg = selectedImage;
      currentUser.wallet = {
        balance: 3000,
        currency: "FCFA",
      };
      navigation.replace("BottomTab");
    }
  };

  const selectPhotoTapped = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <>
      <ImageBackground
        source={require("../../../assets/images/bgimg.png")}
        resizeMode="stretch"
        style={{ alignSelf: "center", width: WIDTH, height: HEIGHT }}
      >
        <Logo
          imgStyle={{ width: 250, height: 100 }}
          logoStyle={{
            width: 222,
            height: 100,
            margin: 20,
            alignSelf: "center",
          }}
        />
        <Profile
          img={selectedImage.localUri}
          name={""}
          onEditImgTap={() => selectPhotoTapped()}
        />
        <InputField
          placeholder={Translator.getString("fNameLabel")}
          value={fName}
          onChangeText={(input) => setFName(input)}
          inputStyle={{ backgroundColor: "transparent", width: "70%" }}
        />
        <InputField
          placeholder={Translator.getString("lNameLabel")}
          value={lName}
          onChangeText={(input) => setLName(input)}
          inputStyle={{ backgroundColor: "transparent", width: "70%" }}
        />
        {/* <InputField
          value={phone}
          inputStyle={{ backgroundColor: 'transparent', width: '70%' }}
          editable={false}
        /> */}
        <RoundCornerButton
          title={Translator.getString("updateLabel")}
          btnStyle={{ alignSelf: "center" }}
          onPress={onUpdatePress}
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

export default NewUser;

import React, { useEffect, useState } from "react";
import * as Translator from "../../localization/";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  YellowBox,
} from "react-native";
import { Logo, RoundCornerButton } from "../../component";
import { color, HEIGHT, WIDTH } from "../../utility";
import { LinearGradient } from "expo-linear-gradient";
import { getAsyncStorage, setAsyncStorage, keys } from "../../asyncStorage";

console.disableYellowBox = true;
const statusHeight = StatusBar.currentHeight;
//TODO: update locale from radio option and get from props here

const WelcomeScreen = ({ navigation }) => {
  const [value, setValue] = useState("en-US");
  Translator.default(value, true);

  useEffect(() => {
    getAsyncStorage(keys.lang)
      .then((res) => {
        if (res == null) {
          setAsyncStorage(keys.lang, value);
        } else {
          setValue(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const RadioButtons = () => {
    const options = [
      {
        code: "en-US",
        lang: "English",
      },
      {
        code: "fr-FR",
        lang: "French",
      },
    ];

    return options.map((item) => {
      return (
        <View key={item.code} style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setValue(item.code)}
          >
            {value === item.code && <View style={styles.checkedCircle} />}
          </TouchableOpacity>
          <RoundCornerButton
            title={item.lang}
            btnStyle={{ backgroundColor: "transparent" }}
            onPress={() => setValue(item.code)}
          >
            {value === item.code && <View style={styles.checkedCircle} />}
          </RoundCornerButton>
        </View>
      );
    });
  };

  const onJoinPress = () => {
    if (!value) {
      alert("Please choose language");
    } else {
      setAsyncStorage(keys.lang, value);
      navigation.navigate("Login");
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
          logoStyle={{ width: 250, height: 100, margin: 20 }}
        />
        <Text style={styles.heading}>Language / Langue</Text>
        <RadioButtons />
        <RoundCornerButton
          title={Translator.getString("joinLabel")}
          onPress={onJoinPress}
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
    alignItems: "center",
    backgroundColor: "#380638",
    paddingTop: statusHeight == undefined ? 20 : statusHeight,
  },
  heading: {
    color: color.WHITE,
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: color.CHECKED,
  },
});

export default WelcomeScreen;

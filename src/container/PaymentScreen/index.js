import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { getAsyncStorage, keys } from "../../asyncStorage";
import * as Translator from "../../localization/";
import { InputField, Keyboard, RoundCornerButton } from "../../component";
import { color, HEIGHT, WIDTH } from "../../utility";

const PaymentScreen = ({ navigation, route }) => {
  const data = route.params;
  const [key, setKey] = useState("");
  const [locale, setLang] = useState("");
  Translator.default(locale, true);
  useEffect(() => {
    getAsyncStorage(keys.lang)
      .then((res) => {
        setLang(res);
      })
      .catch((err) => {});
  }, [locale]);

  const onPressKey = (text) => {
    if (text !== "." && isNaN(text)) {
      // not a valid number
      setKey((prevState) => prevState.substring(0, prevState.length - 1));
      return;
    } else {
      setKey((prevState) => prevState + text);
    }
  };

  const onPressNext = () => {
    if (key !== "" && parseFloat(key) > 0) {
      navigation.navigate("PaymentDetails");
    } else {
      alert("Please Enter A Valid Amount");
    }
  };

  return (
    <SafeAreaView style={{ flex: 2, backgroundColor: color.WHITE }}>
      <View
        style={{ flex: 1 / 2, justifyContent: "center", alignItems: "center" }}
      >
        {/* <Text>{data.data.img}</Text> */}
        <Image
          source={require("../../../assets/images/avatar5.png")}
          style={{ height: 40, width: 40, borderRadius: 10 }}
        />
        <Text style={{ fontSize: 18 }}>
          {Translator.getString("sendMoneyLabel")} {data.data.name}
        </Text>
        <InputField
          placeholder={"Enter Amount"}
          value={"FCFA " + key}
          inputStyle={styles.input}
          editable={false}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: color.DARK_APP,
          position: "absolute",
          bottom: 1,
        }}
      >
        <Keyboard onPress={onPressKey} />
        <RoundCornerButton
          title={Translator.getString("sendLabel")}
          onPress={onPressNext}
          btnStyle={{
            width: WIDTH / 1.3,
            alignSelf: "center",
            marginTop: -10,
            backgroundColor: color.LT_APP,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
    paddingHorizontal: 10,
    backgroundColor: color.LT_APP,
    width: WIDTH / 2,
    borderRadius: 10,
  },
});

export default PaymentScreen;

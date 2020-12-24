import React, { useEffect, useState } from "react";
import * as Translator from "../../localization/";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import { getAsyncStorage, keys } from "../../asyncStorage";
import { InputField, RoundCornerButton } from "../../component";
import { color, globalStyle } from "../../utility";

const FeedbackScreen = ({ navigation }) => {
  const [locale, setLang] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  Translator.default(locale, true);
  useEffect(() => {
    getAsyncStorage(keys.lang)
      .then((res) => {
        setLang(res);
      })
      .catch((err) => {});
  }, [locale]);

  const onPress = () => {
    if (!name && name == "" && !email && email == "" && !msg && msg == "") {
      alert(
        Translator.getString("fullNameLabel") +
          " " +
          Translator.getString("fieldEmptyLabel")
      );
    } else if (!email && email == "") {
      alert(
        Translator.getString("email") +
          " " +
          Translator.getString("fieldEmptyLabel")
      );
    } else if (!msg && msg == "") {
      alert(
        Translator.getString("msgLabel") +
          " " +
          Translator.getString("fieldEmptyLabel")
      );
    } else {
      // Feedback(name, email, msg).then(res => {
      //     console.log(res,'====================================')
      setName("");
      setEmail("");
      setMsg("");
      alert(Translator.getString("fbSubmittedLabel"));
      // })
    }
  };

  return (
    <SafeAreaView style={[globalStyle.flex1]}>
      <Text style={styles.head}>{Translator.getString("contactUsLabel")}</Text>
      <InputField
        placeholder={Translator.getString("fullNameLabel")}
        onChangeText={(input) => setName(input)}
        value={name}
        placeholderTextColor={color.DARK_APP}
        inputStyle={styles.input}
      />
      <InputField
        placeholder={Translator.getString("email")}
        onChangeText={(input) => setEmail(input)}
        value={email}
        placeholderTextColor={color.DARK_APP}
        inputStyle={styles.input}
      />
      <InputField
        placeholder={Translator.getString("tellMeLabel")}
        placeholderTextColor={color.DARK_APP}
        onChangeText={(input) => setMsg(input)}
        value={msg}
        multiline={true}
        numberOfLines={8}
        inputStyle={[styles.input, { height: 150 }]}
      />
      <RoundCornerButton
        title={Translator.getString("sendLabel")}
        onPress={onPress}
        btnStyle={{
          alignSelf: "center",
          paddingHorizontal: 20,
          backgroundColor: color.DARK_APP,
        }}
      />
      <Text
        style={{
          fontWeight: "bold",
          paddingLeft: 11,
          alignSelf: "flex-start",
          fontSize: 18,
          color: color.DARK_APP,
        }}
      >
        {"You can also reach out to us via:"}
      </Text>
      <Text
        style={{
          fontWeight: "600",
          paddingLeft: 11,
          paddingVertical: 5,
          alignSelf: "flex-start",
          fontSize: 16,
          color: color.DARK_APP,
        }}
      >
        {"Call : 671 848 382"}
      </Text>
      <Text
        style={{
          fontWeight: "600",
          paddingLeft: 11,
          paddingVertical: 5,
          alignSelf: "flex-start",
          fontSize: 16,
          color: color.DARK_APP,
        }}
      >
        {"WhatsApp : 671 848 382"}
      </Text>
      <Text
        style={{
          fontWeight: "600",
          paddingLeft: 11,
          paddingVertical: 5,
          alignSelf: "flex-start",
          fontSize: 16,
          color: color.DARK_APP,
        }}
      >
        {"Text : 671 848 382"}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    color: color.DARK_APP,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 10,
  },
  input: {
    width: "90%",
    borderRadius: 20,
    color: color.DARK_APP,
    borderWidth: 2,
    paddingHorizontal: 15,
    borderColor: color.GREY,
  },
});

export default FeedbackScreen;

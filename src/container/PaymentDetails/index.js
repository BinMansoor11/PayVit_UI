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
import { globalStyle, color, appStyle, WIDTH } from "../../utility";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Translator from "../../localization/";
import { getAsyncStorage, keys } from "../../asyncStorage";
import { RoundCornerButton } from "../../component";

const PaymentDetails = ({ navigation }) => {
  const [locale, setLang] = useState("");
  Translator.default(locale, true);
  useEffect(() => {
    getAsyncStorage(keys.lang)
      .then((res) => {
        setLang(res);
      })
      .catch((err) => {});
  }, [locale]);

  const data = {
    currency: "FCFA",
    amount: "940",
    balance: "20495.00",
    receipientUserImage: require("../../../assets/images/avatar3.png"),
    reciepientUserName: "Chris Steward",
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: color.WHITE }}
    >
      <View style={styles.card}>
        <View style={{ margin: 10, justifyContent: "space-between" }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 22, color: color.WHITE }}
          >
            {Translator.getString("sendLabel")}{" "}
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 22, color: color.WHITE }}
          >
            {data.currency + data.amount}
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 22, color: color.WHITE }}
          >
            {Translator.getString("yourBalanceLabel") + " " + data.balance}
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 22, color: color.WHITE }}
          >
            {Translator.getString("toLabel")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "space-between",
            }}
          >
            <Image
              source={data.receipientUserImage}
              style={{ height: 40, width: 40 }}
            />
            <Text
              style={{ fontWeight: "bold", fontSize: 22, color: color.WHITE }}
            >
              {data.reciepientUserName}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <TouchableOpacity style={styles.btn}>
          <FontAwesome5
            name="receipt"
            size={25}
            color={color.WHITE}
            style={{
              backgroundColor: color.LT_APP,
              paddingVertical: 15,
              paddingHorizontal: 19,
              marginRight: 10,
              borderRadius: 20,
            }}
          />
          <Text style={[styles.text]}>
            {Translator.getString("getReceiptLabel")}
          </Text>
          <Text style={[styles.text, { paddingLeft: 90 }]}>{"> "}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <MaterialCommunityIcons
            name="email-outline"
            size={25}
            color={color.WHITE}
            style={{
              backgroundColor: color.LT_APP,
              padding: 15,
              marginRight: 10,
              borderRadius: 20,
            }}
          />
          <Text style={[styles.text]}>
            {Translator.getString("sendByEmailLabel")}
          </Text>
          <Text style={[styles.text, { paddingLeft: 55 }]}>{">"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <MaterialCommunityIcons
            name="reload"
            size={25}
            color={color.WHITE}
            style={{
              backgroundColor: color.LT_APP,
              padding: 15,
              marginRight: 10,
              borderRadius: 20,
            }}
          />
          <Text style={[styles.text]}>
            {Translator.getString("regularPaymentLabel")}
          </Text>
          <Text style={[styles.text, { paddingLeft: 40 }]}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <RoundCornerButton
        title={`<  ` + Translator.getString("backLabel")}
        btnTextStyle={{ color: color.DARK_APP }}
        btnStyle={{ backgroundColor: color.TRANSPARENT, marginTop: -10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.DARK_APP,
    margin: 20,
    width: "90%",
    height: 200,
    alignContent: "center",
    borderRadius: 15,
    shadowColor: "#fff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  btn: {
    backgroundColor: color.DARK_APP,
    flexDirection: "row",
    height: appStyle.btnHeight + 40,
    borderRadius: appStyle.btnBorderRadius + 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: appStyle.btnMarginVertical - 10,
    paddingHorizontal: 20,
    width: WIDTH / 1.1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.WHITE,
  },
});

export default PaymentDetails;

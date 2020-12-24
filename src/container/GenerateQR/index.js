import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { currentUser, currentUserID } from "../../appData";
import { getAsyncStorage, keys } from "../../asyncStorage";
import { InputField, RoundCornerButton } from "../../component";
import * as Translator from "../../localization/";
import { color, HEIGHT } from "../../utility";
import { getFormattedNumber } from "../../utility/styleHelper/appStyle";
let logo = require("../../../assets/icon1.png");

const GenerateQR = ({ navigation }) => {
  const [amount, setAmount] = useState(0);
  const prevAmountRef = useRef();
  useEffect(() => {
    prevAmountRef.current = amount;
  });
  const prevAmount = prevAmountRef.current;
  const Decreament = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share your idea",
      });
      if (result.action === Share.sharedAction) {
        console.log(result.action, "=========", Share.sharedAction);
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log(result.activityType, "====tttt=====");
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: color.DARK_APP }}
    >
      <AntDesign
        name="sharealt"
        size={25}
        color={color.WHITE}
        style={{ padding: 20, alignSelf: "flex-end" }}
        onPress={onShare}
      />
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
        {Translator.getString("qrLabel")}
      </Text>
      <View style={styles.card}>
        <View
          style={
            ([styles.card],
            { paddingVertical: 0, paddingBottom: 20, flexDirection: "row" })
          }
        >
          <Image
            source={{ uri: currentUser.profileImg.localUri }}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={{
              fontWeight: "600",
              fontSize: 22,
              color: color.DARK_APP,
              paddingLeft: 20,
            }}
          >
            {currentUser.firstName + " " + currentUser.lastName}
          </Text>
        </View>
        <QRCode
          size={HEIGHT / 3.5}
          value={`${currentUser.userID},${amount}`}
          logo={logo}
          logoSize={50}
          color={color.DARK_APP}
          logoBackgroundColor={color.WHITE}
          // logoBorderRadius={10}
        />
        <View
          style={{
            flexDirection: "row",
            width: "70%",
            justifyContent: "center",
          }}
        >
          <RoundCornerButton
            title="+"
            onPress={() => setAmount(amount + 1)}
            btnStyle={{ backgroundColor: color.TRANSPARENT }}
            btnTextStyle={{
              color: color.DARK_APP,
              fontSize: 40,
              fontWeight: "100",
            }}
          />
          <Text
            style={{
              color: color.DARK_APP,
              fontSize: 30,
              fontWeight: "100",
              alignSelf: "center",
            }}
          >
            FCFA
          </Text>
          <InputField
            value={`${amount}`}
            onChangeText={(input) => setAmount(input)}
            inputStyle={{
              alignSelf: "center",
              color: color.DARK_APP,
              fontSize: 35,
              paddingHorizontal: 10,
              width: "50%",
              textAlign: "center",
            }}
          />
          <RoundCornerButton
            title="-"
            onPress={Decreament}
            btnStyle={{ backgroundColor: color.TRANSPARENT }}
            btnTextStyle={{
              color: color.DARK_APP,
              fontSize: 40,
              fontWeight: "100",
            }}
          />
        </View>
        <View
          style={[
            styles.card,
            { backgroundColor: color.DARK_APP, marginTop: 0 },
          ]}
        >
          <Text style={{ fontWeight: "600", fontSize: 22, color: color.WHITE }}>
            {Translator.getString("balanceLabel")}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 22, color: color.WHITE }}>
            {currentUser.wallet.currency +
              " " +
              getFormattedNumber(currentUser.wallet.balance)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.WHITE,
    marginTop: 10,
    paddingVertical: 25,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#fff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
});

export default GenerateQR;

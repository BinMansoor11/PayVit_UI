import React, { useState, useEffect } from "react";
import { StyleSheet, Image, StatusBar, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Logo } from "../../component";
import { color, HEIGHT, WIDTH } from "../../utility";

const PayTab = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    // setScanned(true);
    // console.log("Read this data ",data)
    // var sendToUserData = await UserAPI.getUserData(data)

    // console.log("Read this sendto data ",sendToUserData)
    // if(sendToUserData && sendToUserData != null && sendToUserData.firstName){
    //   // let userData = {
    //   userID : data,
    //   userData : sendToUserData
    // }
    // console.log("UserData: ",userData)
    // setScanned(false)
    let userData = {
      id: "0",
      name: "Chris",
      img: require("../../../assets/images/avatar1.png"),
      date: "clothes",
      amount: "- FCFA 7.99",
    };
    // alert("Scanned Data for User with user id" data)
    navigation.navigate("PaymentScreen", { data: userData });
    // } else{
    //   alert(Translator.getString('invalidQRCodeLabel'))
    //   // setScanned(false)
    // }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Logo
          imgStyle={{ width: 250, height: 100 }}
          logoStyle={{
            width: WIDTH,
            height: "15%",
            backgroundColor: color.DARK_APP,
            borderRadius: 0,
            alignSelf: "center",
          }}
        />
        <Image
          style={styles.qr}
          source={require("../../../assets/images/qr2.png")}
        />
        <View
          style={{
            position: "absolute",
            bottom: 120,
            width: WIDTH,
            height: "15%",
            backgroundColor: color.DARK_APP,
          }}
        />
      </BarCodeScanner>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DARK_APP,
    height: HEIGHT * 1.0585,
    width: WIDTH,
  },

  qr: {
    width: "90%",
    height: "40%",
    marginTop: "15%",
    resizeMode: "stretch",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default PayTab;

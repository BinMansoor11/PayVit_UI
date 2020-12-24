import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { globalStyle, color, WIDTH, HEIGHT } from "../../utility";
import * as Translator from "../../localization/";
import BottomSheet from "reanimated-bottom-sheet";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { currentUser } from "../../appData";
import {
  getFormattedNumber,
  getPhoneNumberWithoutCountryCode,
} from "../../utility/styleHelper/appStyle";
import { RoundCornerButton } from "../../component";

const Home = ({ navigation, userData = currentUser }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [expend, setExpend] = useState(false);

  const dataHistory = [
    {
      id: "0",
      name: "Chris",
      img: require("../../../assets/images/avatar1.png"),
      date: "clothes",
      amount: "- FCFA 7.99",
    },
    {
      id: "1",
      name: "Alex",
      img: require("../../../assets/images/avatar2.png"),
      date: "taxi",
      amount: "+ FCFA 67",
    },
    {
      id: "2",
      name: "Frex",
      img: require("../../../assets/images/avatar3.png"),
      date: "bill",
      amount: "- FCFA 45",
    },
    {
      id: "3",
      name: "Lou",
      img: require("../../../assets/images/avatar4.png"),
      date: "taxi",
      amount: "+ FCFA 78",
    },
    {
      id: "4",
      name: "peri",
      img: require("../../../assets/images/avatar5.png"),
      date: "grocery",
      amount: "- FCFA 12",
    },
    {
      id: "5",
      name: "Alex",
      img: require("../../../assets/images/avatar2.png"),
      date: "clothes",
      amount: "- FCFA 7.99",
    },
    {
      id: "6",
      name: "Frex",
      img: require("../../../assets/images/avatar3.png"),
      date: "shopping",
      amount: "- FCFA 88",
    },
    {
      id: "7",
      name: "Lou",
      img: require("../../../assets/images/avatar4.png"),
      date: "other",
      amount: "+ FCFA 99",
    },
    {
      id: "8",
      name: "peri",
      img: require("../../../assets/images/avatar5.png"),
      date: "15/10/2020",
      amount: "- FCFA 99",
    },
    {
      id: "9",
      name: "Alex",
      img: require("../../../assets/images/avatar2.png"),
      date: "clothes",
      amount: "- FCFA 7.99",
    },
    {
      id: "10",
      name: "Frex",
      img: require("../../../assets/images/avatar3.png"),
      date: "shopping",
      amount: "- FCFA 88",
    },
    {
      id: "11",
      name: "Lou",
      img: require("../../../assets/images/avatar4.png"),
      date: "other",
      amount: "+ FCFA 99",
    },
    {
      id: "12",
      name: "peri",
      img: require("../../../assets/images/avatar5.png"),
      date: "15/10/2020",
      amount: "- FCFA 99",
    },
  ];

  const renderItem = ({ item }) => (
    <Item
      key={item.key}
      name={item.name}
      img={item.img}
      onPress={() => navigation.navigate("PaymentScreen", { data: item })}
    />
  );

  const Item = ({ name, img, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.card, { height: 100, width: 100, marginHorizontal: 7 }]}
      >
        <Image
          source={img}
          style={{
            height: 40,
            width: 40,
            alignSelf: "center",
            marginTop: 15,
            borderRadius: 15,
          }}
        />
        <Text
          style={{
            fontWeight: "400",
            paddingVertical: 2,
            fontSize: 15,
            alignSelf: "center",
            color: color.WHITE,
          }}
        >
          {name}{" "}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHistory = ({ item }) => (
    <ItemHis
      name={item.name}
      img={item.img}
      date={item.date}
      amt={item.amount}
    />
  );

  const ItemHis = ({ name, img, date, amt }) => (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: color.LT_APP,
        borderRadius: 15,
        justifyContent: "space-around",
        padding: 10,
        marginVertical: 8,
      }}
    >
      <Image
        source={img}
        style={{ height: 40, width: 40, alignSelf: "center", borderRadius: 15 }}
      />
      <View style={{ paddingHorizontal: 10, width: "50%" }}>
        <Text
          style={{
            fontWeight: "400",
            paddingVertical: 2,
            fontSize: 18,
            color: color.WHITE,
          }}
        >
          {name}
        </Text>
        <Text style={{ color: color.WHITE }}>{date}</Text>
      </View>
      <Text
        style={{
          fontWeight: "400",
          fontSize: 18,
          alignSelf: "center",
          width: "40%",
          color: color.WHITE,
        }}
      >
        {amt}
      </Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: color.DARK_APP,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 130,
        // minHeight:HEIGHT,
        height: dataHistory.length > 7 ? dataHistory.length * 85 + 130 : HEIGHT,
      }}
    >
      <View
        style={{
          backgroundColor: color.WHITE,
          width: 30,
          height: 8,
          alignSelf: "center",
          borderRadius: 5,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: color.WHITE }}>
          {Translator.getString("historyLabel")}
        </Text>
        <MaterialCommunityIcons name="history" color={color.WHITE} size={30} />
      </View>
      <View
        style={{
          backgroundColor: color.DARK_APP,
        }}
      >
        <FlatList
          data={dataHistory}
          renderItem={renderHistory}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );

  // const cardNumber = getPhoneNumberWithoutCountryCode(userData.phoneNumber).split('');
  const cardNumber = [
    require("../../../assets/icon1.png"),
    require("../../../assets/mastercard.png"),
    require("../../../assets/visa.png"),
    require("../../../assets/money.png"),
    require("../../../assets/world.png"),
    require("../../../assets/ornge.png"),
  ];
  console.log(cardNumber);
  const CardNo = () => {
    return cardNumber.map((logo) => (
      // <Text style={{ fontWeight: '600', borderWidth: 1, borderColor: color.WHITE, paddingHorizontal: 5, marginHorizontal: 3, color: color.WHITE, fontSize: 15, borderRadius: 5 }}>{number}</Text>
      <Image
        source={logo}
        resizeMode="stretch"
        style={{ height: 40, width: 55 }}
      />
    ));
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: color.WHITE }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible1(true);
                setModalVisible(false);
              }}
              style={{
                flexDirection: "row",
                backgroundColor: color.DARK_APP,
                borderRadius: 15,
                justifyContent: "space-around",
                padding: 10,
                marginVertical: 8,
              }}
            >
              <Image
                source={require("../../../assets/images/avatar3.png")}
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: "center",
                  borderRadius: 15,
                }}
              />
              <View style={{ paddingHorizontal: 20, width: "50%" }}>
                <Text
                  style={{
                    fontWeight: "400",
                    paddingVertical: 2,
                    fontSize: 18,
                    color: color.WHITE,
                  }}
                >
                  {"Alex"}
                </Text>
                <Text style={{ color: color.WHITE }}>{"FCFA 50"}</Text>
              </View>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 18,
                  alignSelf: "center",
                  width: "40%",
                  color: color.WHITE,
                }}
              >
                {"Request"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: 10,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: "7%",
              color: color.LT_APP,
              alignSelf: "center",
              marginRight: -50,
            }}
          >
            {Translator.getString("welcomeLabel")}{" "}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: "7%",
              color: color.LT_APP,
              alignSelf: "center",
              marginRight: -50,
            }}
          >
            {userData.firstName}{" "}
          </Text>
        </View>
        <Image
          source={require("../../../assets/icon1.png")}
          style={{ height: 40, width: 40 }}
        />
        <AntDesign
          name="notification"
          size={25}
          color={color.LT_APP}
          style={{ paddingHorizontal: "7%" }}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 22, color: color.WHITE }}
          >
            PayVit{" "}
          </Text>
          <View
            style={{
              backgroundColor: color.LT_APP,
              marginTop: -10,
              width: 25,
              height: 30 + 15,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: "#6f56a3",
              marginTop: -10,
              width: 25,
              height: 25 + 15,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: color.LT_APP,
              marginTop: -10,
              width: 25,
              height: 40 + 15,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: color.CHECKED,
              marginTop: -10,
              width: 25,
              height: 30 + 15,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <View
            style={{
              backgroundColor: "#db7140",
              marginTop: -10,
              width: 25,
              height: 35 + 15,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <Image
            source={{ uri: userData.profileImg.localUri }}
            style={{ height: 40, width: 40, borderRadius: 10 }}
          />
        </View>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 22,
            alignSelf: "center",
            color: color.WHITE,
            letterSpacing: 5,
          }}
        >
          237 671 848 382
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={require("../../../assets/icon1.png")}
            resizeMode="stretch"
            style={{ height: 40, width: 40, marginRight: 10 }}
          />
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,
              alignSelf: "center",
              color: color.WHITE,
            }}
          >
            {Translator.getString("balanceLabel")}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              paddingVertical: 4,
              fontSize: 15,
              alignSelf: "center",
              color: color.WHITE,
            }}
          >
            {userData.wallet.currency +
              " " +
              getFormattedNumber(userData.wallet.balance)}{" "}
          </Text>
          <Image
            source={require("../../../assets/mastercard.png")}
            resizeMode="stretch"
            style={{ height: 40, width: 50 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            justifyContent: "space-evenly",
          }}
        >
          {/* <CardNo /> */}
          <View
            style={{
              backgroundColor: "white",
              padding: 11,
              alignSelf: "center",
            }}
          >
            <Image
              source={require("../../../assets/visa.png")}
              resizeMode="stretch"
              style={{ height: 15, width: 25, backgroundColor: "white" }}
            />
          </View>
          <View style={{ backgroundColor: "white", alignSelf: "center" }}>
            <Image
              source={require("../../../assets/money.png")}
              resizeMode="stretch"
              style={{ height: 35, width: 45, backgroundColor: "white" }}
            />
          </View>
          <View style={{ backgroundColor: "white", alignSelf: "center" }}>
            <Image
              source={require("../../../assets/world.png")}
              resizeMode="stretch"
              style={{ height: 35, width: 45, backgroundColor: "white" }}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={require("../../../assets/mtm.jpeg")}
              resizeMode="stretch"
              style={{ height: 35, width: 45 }}
            />
          </View>
        </View>
      </View>
      <Text style={{ color: color.LT_APP, fontSize: 18, fontWeight: "bold" }}>
        {" "}
        {Translator.getString("sendMoneyToFriendLabel")}{" "}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingVertical: 25 }}>
          <View
            style={{
              alignSelf: "center",
              borderWidth: 1,
              borderRadius: 15,
              borderColor: color.LT_APP,
              paddingHorizontal: 15,
              paddingVertical: 4,
              marginHorizontal: 15,
            }}
          >
            <Text style={{ fontSize: 30, color: color.LT_APP }}>+</Text>
          </View>
          <Text
            style={{
              color: color.LT_APP,
              paddingHorizontal: 15,
              fontWeight: "bold",
            }}
          >
            {Translator.getString("searchLabel")}
          </Text>
          <Text
            style={{
              color: color.LT_APP,
              paddingHorizontal: 15,
              fontWeight: "bold",
            }}
          >
            {Translator.getString("contactLabel")}{" "}
          </Text>
        </View>
        <FlatList
          data={dataHistory}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["25%", "90%", "25%", "25%"]}
        borderRadius={15}
        renderContent={renderContent}
        // enabledBottomInitialAnimation={true}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(false);
          setExpend(false);
        }}
      >
        <View style={[styles.centeredView, { justifyContent: "flex-end" }]}>
          <View style={[styles.modalView, { paddingTop: 0 }]}>
            <View
              style={{
                backgroundColor: color.DARK_APP,
                marginVertical: 10,
                width: 35,
                height: 8,
                alignSelf: "center",
                borderRadius: 5,
              }}
            />
            {!expend ? (
              <TouchableOpacity
                onPress={() => setExpend(true)}
                style={{
                  flexDirection: "row",
                  backgroundColor: color.DARK_APP,
                  borderRadius: 15,
                  justifyContent: "space-around",
                  padding: 10,
                  width: WIDTH / 1.3,
                }}
              >
                <Image
                  source={require("../../../assets/images/avatar3.png")}
                  style={{
                    height: 40,
                    width: 40,
                    alignSelf: "center",
                    borderRadius: 15,
                  }}
                />
                <View
                  style={{
                    paddingLeft: 30,
                    width: WIDTH / 1.4,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: color.WHITE,
                      paddingVertical: 5,
                    }}
                  >
                    {"Payment Reques Received"}
                  </Text>
                  <Text style={{ color: color.WHITE }}>{"FCFA 50"}</Text>
                </View>
                {/* <Text style={{ fontWeight: '400', fontSize: 18, alignSelf: 'center', width: '40%', color: color.WHITE }}>{'Request'}</Text> */}
              </TouchableOpacity>
            ) : (
              <View style={{ justifyContent: "center", width: "100%" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingVertical: 2,
                    alignSelf: "center",
                    paddingBottom: 10,
                    fontSize: 18,
                    color: color.DARK_APP,
                  }}
                >
                  {"Payment Request Detail"}
                </Text>
                <Image
                  source={require("../../../assets/images/avatar3.png")}
                  style={{
                    height: 40,
                    width: 40,
                    alignSelf: "center",
                    borderRadius: 15,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingVertical: 10,
                    alignSelf: "center",
                    fontSize: 18,
                    color: color.DARK_APP,
                  }}
                >
                  {"Alex"}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingVertical: 11,
                      alignSelf: "flex-start",
                      fontSize: 18,
                      color: color.DARK_APP,
                    }}
                  >
                    Amount
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingVertical: 11,
                      alignSelf: "flex-start",
                      fontSize: 18,
                      color: "#db7140",
                    }}
                  >
                    FCFA 50
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingVertical: 11,
                    alignSelf: "flex-start",
                    fontSize: 18,
                    color: color.DARK_APP,
                  }}
                >
                  {"Description"}
                </Text>
                <Text style={{ color: color.DARK_APP }}>
                  {"I need you to pay our billing on last month \t Thanks"}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    alignSelf: "center",
                  }}
                >
                  <RoundCornerButton
                    title="Reject"
                    onPress={() => {
                      alert("You Reject");
                      setModalVisible1(false);
                      setExpend(false);
                    }}
                    btnStyle={{ backgroundColor: color.TRANSPARENT }}
                    btnTextStyle={{
                      color: color.DARK_APP,
                      fontSize: 18,
                      fontWeight: "100",
                    }}
                  />
                  <RoundCornerButton
                    title="Accept"
                    onPress={() => {
                      alert("You Paid");
                      setModalVisible1(false);
                      setExpend(false);
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Home;

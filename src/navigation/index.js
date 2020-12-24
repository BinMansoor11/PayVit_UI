import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { 
  LoginScreen,
  LocalAuthScreen, 
  PaymentScreen, 
  PaymentDetails, 
  VerifyScreen, 
  PayTab, 
  WelcomeScreen, 
  Home,
  GenerateQR,
  FeedbackScreen,
  RequestScreen,
  NewUser,
  Pincode,
  ReqVerifyScreen
} from "../container";
import * as Translator from '../localization/';
import { View } from "react-native";
import { color } from "../utility";


const Stack = createStackNavigator();

function NavContainer() {
  
  return (     <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Welcome"}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="LocalAuth" component={LocalAuthScreen} />
        <Stack.Screen name="Pincode" component={Pincode} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <HomeStack.Screen name="PaymentDetails" component={PaymentDetails} />
    </HomeStack.Navigator>
  );
};

const Request = createStackNavigator();

function RequestStackScreen() {
  return (
    <Request.Navigator screenOptions={{ headerShown: false }} initialRouteName="RequestScreen">
      <Request.Screen name="RequestScreen" component={RequestScreen} />
      <Request.Screen name="ReqVerifyScreen" component={ReqVerifyScreen} />
    </Request.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      tabBarOptions={{ activeTintColor: color.DARK_APP }}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: Translator.getString('homeLabel'),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="GenerateBar Code"
        component={GenerateQR}
        options={{
          tabBarLabel: Translator.getString('generatecodeLabel'),
          tabBarIcon: ({ color }) => (
            <AntDesign name="qrcode" color={color} size={25} />
          ),

        }}
      />
      <BottomTab.Screen
        name="Scan Pay"
        component={PayTab}
        options={{
          tabBarLabel: Translator.getString('scanpayLabel'),
          tabBarIcon: ({ color }) => (
            <View style={{ backgroundColor: '#db7140', borderRadius: 15, padding: 5, marginBottom: 10 }}>
              <AntDesign name="scan1" color='white' size={35} />
            </View>
          ),

        }}
      />
      <BottomTab.Screen
        name="Request Accept"
        component={RequestStackScreen}
        options={{
          tabBarLabel: Translator.getString('requestLabel')+' '+Translator.getString('acceptLabel'),
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="exchange-alt" color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          tabBarLabel: Translator.getString('contactUsLabel'),
          tabBarIcon: ({ color }) => <MaterialIcons name="contact-mail" color={color} size={25} />,
        }}
      />
    </BottomTab.Navigator>
  );
  
}



export default NavContainer;

// import React, { useEffect, useState } from "react";
// import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { 
//   LoginScreen,
//   LocalAuthScreen, 
//   PaymentScreen, 
//   PaymentDetails, 
//   VerifyScreen, 
//   PayTab, 
//   WelcomeScreen, 
//   Home,
//   GenerateQR,
//   FeedbackScreen,
//   RequestScreen,
//   NewUser
// } from "../container";
// import * as Translator from '../localization/';
// import { View } from "react-native";
// import { color } from "../utility";
// import { getAsyncStorage, keys } from "../asyncStorage";


// const Stack = createStackNavigator();

// function NavContainer() {
//   const [locale, setLang] = useState('');
//   Translator.default(locale, true)
//   useEffect(() => {
//       getAsyncStorage(keys.lang).then(res => {
//           setLang(res);
//       }).catch(err => {
//       });
//   }, [locale]);
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
//         {/* <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Verify" component={VerifyScreen} />
//         <Stack.Screen name="NewUser" component={NewUser} />
//         <Stack.Screen name="Welcome" component={WelcomeScreen} />
//         <Stack.Screen name="LocalAuth" component={LocalAuthScreen} /> */}
//         <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const HomeStack = createStackNavigator();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
//       <HomeStack.Screen name="Home" component={Home} />
//       <HomeStack.Screen name="PaymentScreen" component={PaymentScreen} />
//       <HomeStack.Screen name="PaymentDetails" component={PaymentDetails} />
//     </HomeStack.Navigator>
//   );
// };

// const BottomTab = createBottomTabNavigator();
// function BottomTabNavigator() {
//   return (
//     <BottomTab.Navigator
//       initialRouteName="GenerateBar Code"
//       tabBarOptions={{ activeTintColor: '#0384fc' }}
//     >
//       <BottomTab.Screen
//         name="GenerateBar Code"
//         component={GenerateQR}
//         options={{
//           tabBarLabel: 'EWALLET',
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="ios-wallet" color={color} size={30} />
//           ),

//         }}
//       />
//       <BottomTab.Screen
//         name="HomeTab"
//         component={HomeStackScreen}
//         options={{
//           tabBarLabel: 'SEND',
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="send" color={color} size={25} />
//           ),
//         }}
//       />
//       <BottomTab.Screen
//         name="Scan Pay"
//         component={PayTab}
//         options={{
//           // tabBarLabel: Translator.getString('scanpayLabel'),
//           // tabBarIcon: ({ color }) => (
//           //   <View style={{ backgroundColor: '#db7140', borderRadius: 15, padding: 5, marginBottom: 10 }}>
//           //     <AntDesign name="scan1" color='white' size={35} />
//           //   </View>
//           // ),
//           tabBarLabel: 'LOGOUT',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="logout" color={color} size={25} />
//           ),

//         }}
//       />
//       {/* <BottomTab.Screen
//         name="Request Accept"
//         component={RequestScreen}
//         options={{
//           tabBarLabel: Translator.getString('requestLabel')+' '+Translator.getString('acceptLabel'),
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="exchange-alt" color={color} size={25} />
//           ),
//         }}
//       />
//       <BottomTab.Screen
//         name="Feedback"
//         component={FeedbackScreen}
//         options={{
//           tabBarLabel: Translator.getString('contactUsLabel'),
//           tabBarIcon: ({ color }) => <MaterialIcons name="contact-mail" color={color} size={25} />,
//         }}
//       /> */}
//     </BottomTab.Navigator>
//   );
// }

// export default NavContainer;


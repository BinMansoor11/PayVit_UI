import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, Text, ActivityIndicator } from "react-native";
import * as Translator from '../../localization/';
import ReactNativePinView from "react-native-pin-view";
import { keys, setAsyncStorage, getAsyncStorage } from "../../asyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../../utility";
import { currentUser } from "../../appData";


const Pincode = ({ navigation}) => {
    const pinView = useRef(null);
    const [locale, setLang] = useState('');
    const [enteredPin, setEnteredPin] = useState("");
    const [enteredConfirmPin, setEnteredConfirmPin] = useState("");
    const [showRemoveButton, setShowRemoveButton] = useState(false);
    const [verifyPin, setVerifyPin] = useState("");
    const [screenText, setScreenText] = useState(Translator.getString('crtPassLabel'));
    const [indicator, setIndicator] = useState(true);
    Translator.default(locale, true)

    // check user already exist
    useEffect(() => {
        getAsyncStorage(keys.lang).then(res => {
            setLang(res);
        })
        getAsyncStorage(keys.pin).then(pin => {
            if (pin) {
                setScreenText(Translator.getString('vrfPassLabel'));
                setIndicator(false);
            }
        }).catch(error => {
            console.log(error);
        })
        //verify exist user
        if (verifyPin.length === 6) {
            setIndicator(true);
            getAsyncStorage(keys.pin).then(pin => {
                if (verifyPin === pin) {
                    setAsyncStorage(keys.userLogin, "loggedIn");
                    setAsyncStorage(keys.loggedInUserID, currentUser.userID)
                    pinView.current.clearAll();
                    navigation.navigate('BottomTab',{lang:locale});
                } else { alert(Translator.getString('pinNotLabel')) }
            }).catch(error => {
                console.log(error);
            })
            pinView.current.clearAll();
        } else if (enteredPin.length === 6 && screenText === Translator.getString('crtPassLabel')) {
            setScreenText(Translator.getString('cnfPassLabel'));
            pinView.current.clearAll();
        } else if (enteredConfirmPin.length === 6) {
            setIndicator(true);
            if (enteredPin === enteredConfirmPin) {
                setAsyncStorage(keys.pin, enteredConfirmPin);
                setAsyncStorage(keys.userLogin, "loggedIn");
                setAsyncStorage(keys.loggedInUserID, currentUser.userID)
                navigation.navigate('BottomTab',{lang:locale})
            } else {
                alert(Translator.getString('pinNotLabel'))
                pinView.current.clearAll();
            }
        } else {
            setShowRemoveButton(true)
            setIndicator(false);
        }

    }, [enteredPin, enteredConfirmPin, verifyPin, locale])

    //input value set
    const CreatePin = (value) => {
        if (screenText === Translator.getString('vrfPassLabel')) {
            setVerifyPin(value);
        } else if (screenText === Translator.getString('crtPassLabel')) {
            setEnteredPin(value);
        } else {
            setEnteredConfirmPin(value);
        }
    };

    return (
        <>
            <StatusBar backgroundColor={color.WHITE} barStyle="dark-content" />
            <SafeAreaView
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text
                    style={{
                        paddingTop: 24,
                        paddingBottom: 48,
                        color: "black",
                        fontSize: 20,
                    }}>
                    {screenText}
                </Text>
                {indicator ? <ActivityIndicator size="large" color={color.DARK_APP} animating={indicator} /> :
                    <ReactNativePinView
                        inputSize={20}
                        ref={pinView}
                        pinLength={6}
                        buttonSize={60}
                        onValueChange={value => CreatePin(value)}
                        buttonAreaStyle={{
                            marginTop: 25,
                        }}
                        inputAreaStyle={{
                            marginBottom: 24,
                        }}
                        inputViewEmptyStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: color.DARK_APP,
                        }}
                        inputViewFilledStyle={{
                            backgroundColor: color.DARK_APP,
                        }}
                        buttonTextStyle={{
                            color: "#000",
                            fontSize: 30
                        }}
                        onButtonPress={key => {
                            if (key === "custom_right") {
                                pinView.current.clear()
                            }
                        }}
                        customRightButton={<Ionicons name="ios-backspace" size={36} color={'#000'} />}
                    />}
            </SafeAreaView>
        </>
    )
}
export default Pincode;

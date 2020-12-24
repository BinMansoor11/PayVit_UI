/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";
import NavContainer from "./src/navigation";
// import {Loader} from "./src/component";
import { StoreProvider } from "./src/context/store";
import { StatusBar } from "react-native";

const App = () => {
    return (
        <StoreProvider>
            <StatusBar barStyle="light-content" />
                <NavContainer />
            {/* <Loader /> */}
        </StoreProvider>
    );
};

export default App;


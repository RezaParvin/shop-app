import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import ContainerShopNavigator from "./navigations/ContainerShopNavigator";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const getFonts = () => {
  return Font.loadAsync({
    "iran-sans": require("./assets/fonts/IRANSans-Regular.ttf"),
    "iran-sans-bold": require("./assets/fonts/IRANSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [loadData, setLoadData] = useState(false);

  if (!loadData) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => {
          setLoadData(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ContainerShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

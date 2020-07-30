import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { Platform } from "react-native";
import ProductOverviewScreen from "../Screens/Shop/ProductOverviewScreen";
import ProductDetailScreen from "../Screens/Shop/ProductDetailScreen.jsx";
import AuthScreen from "../Screens/User/AuthScreen";
import Colors from "../Constants/Colors";
import CartScreen from "../Screens/Shop/CartScreen";
import OrderScreen from "../Screens/Shop/UserOrders";
import ProductUserScreen from "../Screens/User/ProductUserScreen";
import ProductManageScreen from "../Screens/User/ProductManageScreen.jsx";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import StartUpScreen from "../Screens/User/StartUpScreen.jsx";
import { View, SafeAreaView, Button } from "react-native";
import * as authActions from "../redux/auth/actions";
import { useDispatch } from "react-redux";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "iran-sans",
  },
  headerBackTitleStyle: {
    fontFamily: "iran-sans",
  },
};

const productOverviewNavigator = createStackNavigator(
  {
    ProductOverView: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerLabel: (drawerConfig) =>
        Platform.OS === "android" ? (
          <Text
            style={{
              fontFamily: "iran-sans-bold",
              fontSize: 20,
              padding: 10,
              color: drawerConfig.tintColor,
            }}
          >
            محصولات
          </Text>
        ) : (
          "محصولات"
        ),
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          color={drawerConfig.tintColor}
          size={23}
        />
      ),
    },
    defaultNavigationOptions,
  }
);

const userOrderNavigator = createStackNavigator(
  {
    Order: OrderScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerLabel: (drawerConfig) =>
        Platform.OS === "android" ? (
          <Text
            style={{
              fontFamily: "iran-sans-bold",
              fontSize: 20,
              padding: 10,
              color: drawerConfig.tintColor,
            }}
          >
            لیست سفارشات
          </Text>
        ) : (
          "لیست سفارشات"
        ),
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          color={drawerConfig.tintColor}
          size={23}
        />
      ),
    },
  }
);

const userAdminNavigator = createStackNavigator(
  {
    UserProducts: ProductUserScreen,
    EditScreen: ProductManageScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerLabel: (drawerConfig) =>
        Platform.OS === "android" ? (
          <Text
            style={{
              fontFamily: "iran-sans-bold",
              fontSize: 20,
              padding: 10,
              color: drawerConfig.tintColor,
            }}
          >
            مدیریت محصولات
          </Text>
        ) : (
          "مدیریت محصولات"
        ),
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-create" color={drawerConfig.tintColor} size={23} />
      ),
    },
  }
);
const authNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const shopDrawerNavigator = createDrawerNavigator(
  {
    Products: productOverviewNavigator,
    Orders: userOrderNavigator,
    UserAdmin: userAdminNavigator,
  },
  {
    drawerPosition: "right",
    contentOptions: {
      tintColor: Colors.primary,
      activeTintColor: Colors.accent,
      itemStyle: {
        flexDirection: "row-reverse",
        fontFamily: "iran-sans-bold",
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
              <Button
                title="خروج کاربر"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.userLogout());
                }}
              />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const startUpNavigator = createStackNavigator({
  Start: StartUpScreen,
});

const mainAppNavigator = createSwitchNavigator({
  Start: startUpNavigator,
  Auth: authNavigator,
  Shop: shopDrawerNavigator,
});

export default createAppContainer(mainAppNavigator);

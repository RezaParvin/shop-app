import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import OrderItem from "../../Components/OrderItem/OrderItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/HeaderButton/HeaderButton";
import * as orderActions from "../../redux/order/actions.js";
import Colors from "../../Constants/Colors";

const UserOrders = () => {
  const dispatch = useDispatch();

  const currentOrders = useSelector((state) => state.orders.orders);

  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);
  const isRefreshing = useSelector((state) => state.orders.isRefreshing);

  const loadOrders = useCallback(() => {
    dispatch(orderActions.fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>خطایی رخ داده است</Text>
      </View>
    );
  }
  if (!error && !isLoading && currentOrders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>هیچ سفارشی برای شما ثبت نشده است</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadOrders}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.id}
        data={currentOrders}
        renderItem={({ item }) => <OrderItem item={item} />}
      />
    </View>
  );
};

UserOrders.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "لیست سفارشات",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontFamily: "iran-sans-bold",
    fontSize: 22,
  },
});
export default UserOrders;

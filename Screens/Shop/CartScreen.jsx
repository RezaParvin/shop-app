import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Colors from "../../Constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../Components/CartItem/CartItem";
import * as actions from "../../redux/order/actions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => {
    const cartItems = [];
    const cartItemsNow = state.cart.cartItems;

    for (const key in cartItemsNow) {
      cartItems.push({
        id: key,
        title: cartItemsNow[key].title,
        price: +cartItemsNow[key].price,
        quantity: cartItemsNow[key].quantity,
        sum: cartItemsNow[key].sum,
      });
    }
    cartItems.sort((a, b) => a.id - b.id);
    return {
      items: cartItems,
      totalAmount: state.cart.totalAmount,
    };
  });

  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);

  return (
    <View style={styles.cart}>
      <View style={styles.summary}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            title="پرداخت نهایی"
            color={Colors.accent}
            disabled={currentCart.items.length === 0}
            onPress={() => {
              dispatch(
                actions.addOrder(currentCart.items, currentCart.totalAmount)
              );
            }}
          />
        )}
        <View style={styles.containerTotalAmount}>
          <Text style={styles.totalAmount}>
            {(
              Math.round(parseFloat(currentCart.totalAmount).toFixed(2) * 100) /
              100
            ).toString()}{" "}
            دلار
          </Text>

          <Text style={styles.titleTotal}>مبلغ کل :</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={currentCart.items}
        renderItem={({ item }) => <CartItem {...item} deleteable />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    flex: 1,
    backgroundColor: "white",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
  },
  totalAmount: {
    color: Colors.primary,
    fontFamily: "iran-sans-bold",
    fontSize: 22,
  },
  titleTotal: {
    fontFamily: "iran-sans-bold",
    fontSize: 20,
    marginLeft: 10,
  },
  containerTotalAmount: {
    flexDirection: "row",
    alignItems: "center",
  },
});

CartScreen.navigationOptions = {
  headerTitle: "سبد خرید",
};

export default CartScreen;

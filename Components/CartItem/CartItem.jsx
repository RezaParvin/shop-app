import React from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";
import * as actions from "../../redux/cart/actions";

const CartItem = ({ id, title, price, quantity, deleteable }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.cart}>
      <View style={styles.containerDeletePrice}>
        {deleteable && (
          <TouchableOpacity
            onPress={() => {
              dispatch(actions.removeItemOfCart(id));
            }}
          >
            <View style={styles.deleteIcon}>
              <Ionicons
                name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                size={24}
                color="red"
              />
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.price}>{price}</Text>
      </View>
      <View style={styles.containerCountTitle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.totalAmount}>{quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
    marginVertical: 10,
    padding: 15,
  },
  containerCountTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "iran-sans-bold",
    marginRight: 10,
  },
  containerDeletePrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalAmount: {
    fontFamily: "iran-sans-bold",
    fontSize: 17,
  },
  price: {
    fontFamily: "iran-sans",
    fontSize: 18,
    marginLeft: 30,
  },
});

export default CartItem;

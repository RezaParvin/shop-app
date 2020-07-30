import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../Constants/Colors";
import CartItem from "../CartItem/CartItem";

const OrderItem = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <View style={styles.order}>
      <View style={styles.detail}>
        <Text style={styles.amount}>
          {item.totalAmount.toFixed(2).toString()} دلار
        </Text>
        <Text style={styles.date}>{item.readableDate}</Text>
      </View>
      <View style={styles.btn}>
        <Button
          title={showDetail ? "بستن جزئیات" : "نمایش جزئیات"}
          color={Colors.primary}
          onPress={() => {
            setShowDetail((prevState) => !prevState);
          }}
        />
      </View>
      {showDetail && (
        <View style={styles.showDetail}>
          {item.items.map((order) => (
            <CartItem key={order.id} {...order} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    padding: 15,
    borderRadius: 15,
    margin: 20,
    marginVertical: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.26,
    shadowRadius: 9,
    alignItems: "center",
  },
  detail: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    fontFamily: "iran-sans-bold",
    fontSize: 22,
  },
  date: {
    fontFamily: "open-sans",
  },
  btn: {
    marginTop: 15,
    width: "60%",
  },
  showDetail: {
    width: "100%",
  },
});

export default OrderItem;

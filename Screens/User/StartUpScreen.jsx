import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import Colors from "../../Constants/Colors";
import * as authActions from "../../redux/auth/actions";
import { useDispatch } from "react-redux";

const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("userAuth").then((data) => {
      const auth = JSON.parse(data);
      if (
        auth.token &&
        auth.userId &&
        new Date().getTime() < parseInt(auth.expire)
      ) {
        dispatch(
          authActions.authenticateSuccess({
            localId: auth.userId,
            idToken: auth.token,
          })
        );
        dispatch(authActions.setExpireLogout(+auth.expire));
        navigation.navigate("Shop");
      } else {
        navigation.navigate("Auth");
      }
    });
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartUpScreen;

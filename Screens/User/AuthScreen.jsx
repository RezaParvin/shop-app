import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../Components/Input/Input";
import Card from "../../Components/Card/Card";
import Colors from "../../Constants/Colors";
import * as authActions from "../../redux/auth/actions";
const UPDATE_INPUT = "UPDATE_INPUT";

const formReducer = (state, action) => {
  if (action.type === UPDATE_INPUT) {
    const inputValues = { ...state.inputValues };
    inputValues[action.id] = action.value;
    const inputValidities = { ...state.inputValidities };
    inputValidities[action.id] = action.isValid;

    //check overall valid
    let overallValidity = true;
    for (const key in inputValidities) {
      overallValidity = overallValidity && inputValidities[key];
    }

    return {
      ...state,
      inputValues: inputValues,
      inputValidities: inputValidities,
      overallFormValidity: overallValidity,
    };
  }
  return state;
};

const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formInputs, dispatchInput] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    overallFormValidity: false,
  });

  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const isAuthUser = useSelector((state) => !!state.auth.userId);

  const submitFormHandler = (email, password, overallValidity, isSignUp) => {
    if (!overallValidity) {
      Alert.alert("خطای دقت", "لطفا تمام ورودی ها را چک کنید", [
        { text: "باشه", style: "default" },
      ]);
      return;
    }
    dispatch(authActions.authenticate(email, password, isSignUp));
  };

  const onChangeTextHandler = useCallback(
    (id, value, isValid) => {
      dispatchInput({
        type: UPDATE_INPUT,
        id: id,
        value: value,
        isValid: isValid,
      });
    },
    [dispatchInput]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("خطا", error, [{ text: "باشه", style: "default" }]);
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && !error && isAuthUser) {
      navigation.navigate("Shop");
    }
  }, [isAuthUser]);

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.auth}
    >
      <LinearGradient colors={["#ffb5a7", "#fcd5ce"]} style={styles.gradient}>
        <Card style={styles.card}>
          <ScrollView>
            <Input
              id="email"
              label="ایمیل"
              errorLabel="لطفا ایمیل را درست وارد بکنید"
              keyboardType="email-address"
              onChangeHandler={onChangeTextHandler}
              required
              isEmail
            />
            <Input
              id="password"
              label="رمز عبور"
              errorLabel="لطفا پسورد را درست وارد کنید"
              keyboardType="default"
              onChangeHandler={onChangeTextHandler}
              secureTextEntry
              required
              minLength={5}
            />
            <View style={styles.btnContaienr}>
              <View style={styles.btn}>
                {isLoading ? (
                  <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                  <Button
                    title={isSignUp ? "ثبت نام" : "ورود"}
                    color={Colors.primary}
                    onPress={submitFormHandler.bind(
                      this,
                      formInputs.inputValues.email,
                      formInputs.inputValues.password,
                      formInputs.overallFormValidity,
                      isSignUp
                    )}
                  />
                )}
              </View>
              <View style={styles.btn}>
                <Button
                  title={isSignUp ? "ورود به سیستم" : "ثبت نام در سیستم"}
                  color={Colors.accent}
                  onPress={() => {
                    setIsSignUp((prevState) => !prevState);
                    navigation.setParams({
                      title: isSignUp ? "ثبت نام در سیستم" : "ورود به سیستم",
                    });
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  auth: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    maxWidth: 400,
    height: "70%",
    maxHeight: 400,
    justifyContent: "center",
  },
  btn: {
    width: "80%",
    marginBottom: 15,
  },
  btnContaienr: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

AuthScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam("title");
  return {
    headerTitle: title ? title : "ثبت نام در سایت",
  };
};

export default AuthScreen;

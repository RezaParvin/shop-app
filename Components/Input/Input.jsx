import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const actions = {
  INPUT_CHANGE: "INPUT_CHANGE",
  INPUT_BLUR: "INPUT_BLUR",
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case actions.INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case actions.INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  initialValue,
  initialValidity,
  onChangeHandler,
  errorLabel,
  ...otherProps
}) => {
  const [inputElement, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isValid: initialValidity,
    touched: false,
  });

  const onChangeText = (text) => {
    const emailReqexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    if (otherProps.required && text.trim().length === 0) {
      isValid = false;
    }
    if (otherProps.isEmail && !emailReqexp.test(text.toLowerCase())) {
      isValid = false;
    }
    if (otherProps.min && +text < otherProps.min) {
      isValid = false;
    }
    if (otherProps.max && +text > otherProps.max) {
      isValid = false;
    }
    if (otherProps.minLength && text.trim().length < otherProps.minLength) {
      isValid = false;
    }
    dispatch({ type: actions.INPUT_CHANGE, value: text, isValid: isValid });
  };

  onBlurHandler = () => {
    dispatch({ type: actions.INPUT_BLUR });
  };

  useEffect(() => {
    if (inputElement.touched) {
      onChangeHandler(id, inputElement.value, inputElement.isValid);
    }
  }, [inputElement, onChangeHandler]);

  return (
    <View style={styles.containerInp}>
      <Text style={styles.titleInp}>{label}</Text>
      <TextInput
        {...otherProps}
        style={styles.input}
        value={inputElement.value}
        onChangeText={onChangeText}
        onBlur={onBlurHandler}
      />
      {!inputElement.isValid && inputElement.touched && (
        <View style={styles.error}>
          <Text style={{ color: "red", fontFamily: "iran-sans-bold" }}>
            {errorLabel}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerInp: {
    margin: 20,
  },
  titleInp: {
    fontFamily: "iran-sans-bold",
    marginBottom: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: "iran-sans",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 17,
  },
  error: {
    marginVertical: 10,
  },
});

export default Input;

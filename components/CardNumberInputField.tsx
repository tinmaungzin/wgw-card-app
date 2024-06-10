import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  onTypeChange: (text: string) => void;
}

const CardNumberInputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  onTypeChange
}) => {
  const [cardType, setCardType] = useState<"visa" | "mastercard" | "jcb" | "">(
    ""
  );
  useEffect(() => {
    if (/^4/.test(value)) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(value)) {
      setCardType("mastercard");
    } else if (/^(?:2131|1800|35)/.test(value)) {
      setCardType("jcb");
    } else {
      setCardType("");
    }
  }, [value]);

  useEffect(() => {
    onTypeChange(cardType)
  }, [cardType])
  const formatCardNumber = (text: string) => {
    let formattedText = text.replace(/\D/g, "");
    formattedText = formattedText.replace(/(.{4})/g, "$1 ");
    formattedText = formattedText.trim();
    if (formattedText.length > 19) {
      formattedText = formattedText.slice(0, 19);
    }
    return formattedText;
  };
  const handleChangeText = (text: string) => {
    const formattedText = formatCardNumber(text);
    onChangeText(formattedText);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>ATM/Debit/Credit card number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={handleChangeText}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            maxLength={19}
          />
          {cardType === "" ? (
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/visa.png")}
                style={styles.image}
              />
              <Image
                source={require("../assets/master.png")}
                style={styles.image}
              />
              <Image
                source={require("../assets/jcb.png")}
                style={styles.image}
              />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                source={
                  cardType === "visa"
                    ? require("../assets/visa.png")
                    : cardType === "mastercard"
                    ? require("../assets/master.png")
                    : require("../assets/jcb.png")
                }
                style={styles.image}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    height: 48,
  },
  input: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginLeft: 8,
  },
});

export default CardNumberInputField;

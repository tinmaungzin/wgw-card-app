import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
}

const ExpiryDateInputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
}) => {
  const handleTextChange = (text: string) => {
    // Remove any non-numeric characters
    let formattedText = text.replace(/[^\d]/g, "");

    if (formattedText.length > 4) {
      // Trim text to max length of 4 (MMYY)
      formattedText = formattedText.substring(0, 4);
    }

    // Add a slash after MM
    if (formattedText.length >= 2) {
      formattedText =
        formattedText.substring(0, 2) + "/" + formattedText.substring(2);
    }

    // Separate month and year for validation
    const parts = formattedText.split("/");
    const month = parts[0];
    const year = parts.length > 1 ? parts[1] : "";

    // Validate month
    if (month.length === 2 && (parseInt(month) < 1 || parseInt(month) > 12)) {
      return;
    }

    // Validate year
    if (year.length === 2 && parseInt(year) < 24) {
      return;
    }

    // Update the text input value
    onChangeText(formattedText);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Expiry date</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          placeholder="MM/YY"
          keyboardType="numeric"
          maxLength={5}
        />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    height: 48,
    minWidth: "45%",
  },
});

export default ExpiryDateInputField;

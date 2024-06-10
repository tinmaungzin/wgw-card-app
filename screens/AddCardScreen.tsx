import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/cardsSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import CardNumberInputField from "../components/CardNumberInputField";
import ExpiryDateInputField from "../components/ExpiryDateInputField";
import CVCInputField from "../components/CVCInputField";

type AddCardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddCard"
>;

export default function AddCardScreen() {
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [type, setType] = useState("")
  const [cvc, setCvc] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation<AddCardScreenNavigationProp>();

  const handleAddCard = () => {
    dispatch(addCard({ cardNumber, nameOnCard, expiryDate, cvc, type }));
    navigation.navigate("Cards");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <CardNumberInputField
            value={cardNumber}
            onChangeText={setCardNumber}
            onTypeChange={setType}
          />
          <InputField
            label="Name on Card"
            placeholder="Ty Lee"
            value={nameOnCard}
            onChangeText={setNameOnCard}
          />
          <View style={styles.row}>
            <ExpiryDateInputField
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <CVCInputField value={cvc} onChangeText={setCvc} />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/verified-visa.png")}
              style={styles.imageVisa}
            />
            <Image
              source={require("../assets/master-secure.png")}
              style={styles.imageMaster}
            />
            <Image
              source={require("../assets/omise.png")}
              style={styles.imageOmise}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleAddCard}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4ad8da",
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4ad8da",
    marginBottom: 24,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  imageVisa: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginLeft: 8,
  },
  imageMaster: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginLeft: 8,
  },
  imageOmise: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginLeft: 8,
  },
});

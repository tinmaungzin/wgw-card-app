import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type EmptyStateNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddCard"
>;

export default function EmptyCard() {
  const navigation = useNavigation<EmptyStateNavigationProp>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/card-sample.png")}
        style={styles.image}
      />
      <Text style={styles.text}>No Cards found</Text>
      <Text style={styles.text}>
        We recommend adding a card for easy payment
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddCard")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add New Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 36,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "500",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: "#4ad8da",
    fontSize: 18,
    fontWeight: "bold",
  },
});

import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import useOmise from "../hooks/useOmise";
import { Card } from "../types/common";

interface CardItemProps {
  card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const { createToken, createCharge, loading, error, data } =
    useOmise();
  const lastFourDigits = card.cardNumber.slice(-4);
  const [expirationMonth, expirationYear] = card.expiryDate
    .split("/")
    .map(Number);

  const handlePress = async () => {
    try {
      const token = await createToken({
        card: {
          name: card.nameOnCard,
          number: card.cardNumber,
          expiration_month: expirationMonth,
          expiration_year: expirationYear + 2000,
          security_code: card.cvc,
          city: "Bangkok",
          postal_code: 10320,
        },
      });

      const amount = Math.floor(Math.random() * 900) + 100;
      const charge = await createCharge({
        description: "Random Amount Charge",
        amount: amount * 100,
        currency: "thb",
        capture: true,
        card: token.id,
      });
      if (charge.paid) {
        Alert.alert("Payment Successful", `Amount: ${charge.amount / 100} THB`);
      } else {
        Alert.alert("Payment Failed", "Please try again.");
      }
    } catch (error: any) {
      Alert.alert("Payment Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.card,
          Platform.OS === "ios" ? styles.cardIOS : styles.cardAndroid,
        ]}
        onPress={handlePress}
        disabled={loading}  
      >
        <View>
          <Image
            source={
              card.type === "visa"
                ? require("../assets/visa.png")
                : card.type === "mastercard"
                ? require("../assets/master.png")
                : require("../assets/jcb.png")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.cardNumbers}>
          <Text style={styles.cardDots}>....</Text>
          <Text style={styles.cardDots}>....</Text>
          <Text style={styles.cardDots}>....</Text>
          <Text style={styles.cardLastDigits}> {lastFourDigits}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.infoLabel}>Name on Card</Text>
            <Text style={styles.infoValue}>{card.nameOnCard}</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>Expires</Text>
            <Text style={styles.infoValue}>{card.expiryDate}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {loading && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={loading}
          onRequestClose={() => {}}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={loading} size="large" />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 20,
    margin: 16,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  cardNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "gray",
    paddingLeft: 16,
    paddingRight: 16,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  infoLabel: {
    paddingBottom: 16,
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
  },
  infoValue: {
    fontWeight: "bold",
  },
  cardLastDigits: {
    fontWeight: "bold",
    fontSize: 20,
    color: "gray",
    marginTop: 16,
  },
  cardDots: {
    fontWeight: "bold",
    fontSize: 30,
    color: "gray",
  },
  cardIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardAndroid: {
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardItem;

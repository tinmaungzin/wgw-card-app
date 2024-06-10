// @ts-ignore
import Omise from "omise-react-native";
import { OMISE_PUBLIC_KEY, OMISE_SECRET_KEY } from "@env";

Omise.config(OMISE_PUBLIC_KEY, OMISE_SECRET_KEY, "2015-11-17");

export default Omise;

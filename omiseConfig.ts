// @ts-ignore
import Omise from "omise-react-native";
import { OMISE_PUBLIC_KEY, OMISE_SECRET_KEY } from "@env";
// console.log('OMISE_PUBLIC_KEY', OMISE_PUBLIC_KEY)
// console.log('OMISE_SECRET_KEY', OMISE_SECRET_KEY)

Omise.config(OMISE_PUBLIC_KEY, OMISE_SECRET_KEY, "2015-11-17");

export default Omise;

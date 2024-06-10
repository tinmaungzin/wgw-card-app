import { useState } from "react";
import Omise from "../omiseConfig";
import { CardDetails, ChargeDetails } from "../types/common";

const useOmise = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const createToken = async (cardDetails: CardDetails) => {
    setLoading(true);
    setError(null);
    try {
      const token = await Omise.createToken(cardDetails);
      setData(token);
      return token;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createCharge = async (chargeDetails: ChargeDetails) => {
    setLoading(true);
    setError(null);
    try {
      const charge = await Omise.createCharge(chargeDetails);
      setData(charge);
      return charge;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createToken, createCharge, loading, error, data };
};

export default useOmise;

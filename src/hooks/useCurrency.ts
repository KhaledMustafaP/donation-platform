import { useState, useEffect } from "react";

type CurrencyState = {
  currency: string;
  decimals: number;
  setCurrency: (c: string) => void;
  setDecimals: (d: number) => void;
};

const DEFAULT_CURRENCY = "USD";
const DEFAULT_DECIMALS = 0;

export default function useCurrency(): CurrencyState {
  const [currency, setCurrencyState] = useState<string>(DEFAULT_CURRENCY);
  const [decimals, setDecimalsState] = useState<number>(DEFAULT_DECIMALS);

  useEffect(() => {
    try {
      const stored = typeof localStorage !== "undefined" ? localStorage.getItem("currency") : null;
      const storedDec = typeof localStorage !== "undefined" ? localStorage.getItem("currency_decimals") : null;
      if (stored) setCurrencyState(stored);
      if (storedDec) setDecimalsState(Number(storedDec));
    } catch (e) {
      // ignore
    }
  }, []);

  const setCurrency = (c: string) => {
    setCurrencyState(c);
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem("currency", c);
    } catch (e) {
      // ignore
    }
  };

  const setDecimals = (d: number) => {
    setDecimalsState(d);
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem("currency_decimals", String(d));
    } catch (e) {
      // ignore
    }
  };

  return { currency, decimals, setCurrency, setDecimals };
}

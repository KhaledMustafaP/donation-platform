import { useState, useEffect } from "react";

export interface Donation {
  campaign: string;
  id: string;
  name: string;
  email: string;
  amount: string;
  type: "once" | "monthly";
  message: string;
  date: string;
}

export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>(() => {
    const stored = localStorage.getItem("donations");
    return stored ? JSON.parse(stored) : [];
  });

  // 🟢 إضافة تبرع جديد
  const addDonation = (donation: Omit<Donation, "id" | "date">) => {
    const newDonation = {
      ...donation,
      id: crypto.randomUUID(),
      date: new Date().toLocaleString(),
    };
    const updated = [...donations, newDonation];
    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));
  };

  // 🔴 حذف جميع التبرعات (للإدارة)
  const clearDonations = () => {
    setDonations([]);
    localStorage.removeItem("donations");
  };

  useEffect(() => {
    localStorage.setItem("donations", JSON.stringify(donations));
  }, [donations]);

  return { donations, addDonation, clearDonations };
}

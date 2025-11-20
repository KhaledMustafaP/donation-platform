import { useState, useEffect } from "react";
import type { Campaign } from "../types/Campaign";

const STORAGE_KEY = "campaigns_v1";

function loadCampaigns(): Campaign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Campaign[];
  } catch (e) {
    return [];
  }
}

function saveCampaigns(items: Campaign[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    // ignore
  }
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns(loadCampaigns());
  }, []);

  function addCampaign(payload: Omit<Campaign, "id" | "createdAt">) {
    const items = loadCampaigns();
    const id = items.length > 0 ? Math.max(...items.map((c) => c.id)) + 1 : 1;
    const c: Campaign = {
      ...payload,
      id,
      createdAt: new Date().toISOString(),
    } as Campaign;
    const next = [c, ...items];
    saveCampaigns(next);
    setCampaigns(next);
    return c;
  }

  function updateCampaign(id: number, patch: Partial<Campaign>) {
    const items = loadCampaigns();
    const next = items.map((c) => (c.id === id ? { ...c, ...patch } : c));
    saveCampaigns(next);
    setCampaigns(next);
    return next.find((c) => c.id === id) || null;
  }

  function removeCampaign(id: number) {
    const items = loadCampaigns();
    const next = items.filter((c) => c.id !== id);
    saveCampaigns(next);
    setCampaigns(next);
  }

  function getCampaign(id: number) {
    const items = loadCampaigns();
    return items.find((c) => c.id === id) || null;
  }

  function clearCampaigns() {
    saveCampaigns([]);
    setCampaigns([]);
  }

  return {
    campaigns,
    addCampaign,
    updateCampaign,
    removeCampaign,
    getCampaign,
    clearCampaigns,
  } as const;
}

export default useCampaigns;

import { useCallback, useEffect, useState } from "react";

const KEY = "kge_leads_v1";

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Sample Sent",
  "Price Shared",
  "Advance Paid",
  "Designing",
  "Delivered",
  "Closed",
  "Lost",
];

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(leads) {
  try {
    localStorage.setItem(KEY, JSON.stringify(leads));
  } catch {
    // localStorage can throw in private mode or when full — fail quietly.
  }
}

export function getLeads() {
  return read().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export function addLead(lead) {
  const leads = read();
  const newLead = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    status: "New",
    notes: "",
    followUpDate: "",
    ...lead,
  };
  leads.push(newLead);
  write(leads);
  return newLead;
}

export function updateLead(id, patch) {
  const leads = read().map((l) => (l.id === id ? { ...l, ...patch } : l));
  write(leads);
}

export function deleteLead(id) {
  write(read().filter((l) => l.id !== id));
}

// React hook that keeps a component in sync with the leads in localStorage.
export function useLeads() {
  const [leads, setLeads] = useState([]);

  const refresh = useCallback(() => setLeads(getLeads()), []);

  useEffect(() => {
    refresh();
    // Sync across browser tabs.
    const onStorage = (e) => {
      if (e.key === KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  return {
    leads,
    add: (lead) => {
      addLead(lead);
      refresh();
    },
    update: (id, patch) => {
      updateLead(id, patch);
      refresh();
    },
    remove: (id) => {
      deleteLead(id);
      refresh();
    },
    refresh,
  };
}

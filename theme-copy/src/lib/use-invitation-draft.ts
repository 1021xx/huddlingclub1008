"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { InvitationInput } from "./types";

const key = "huddlingclub:invitation-draft:v1";
const empty = JSON.stringify({ title: "", date: "", location: "", body: "" });
const listeners = new Set<() => void>();
let fallback = empty;
let storageUnavailable = false;

function snapshot() {
  if (storageUnavailable) return fallback;
  try {
    fallback = sessionStorage.getItem(key) ?? empty;
  } catch {
    storageUnavailable = true;
  }
  return fallback;
}

function parse(value: string): InvitationInput {
  try {
    const draft = JSON.parse(value);
    if (draft && ["title", "date", "location", "body"].every(field => typeof draft[field] === "string")) {
      return { title: draft.title, date: draft.date, location: draft.location, body: draft.body };
    }
  } catch { /* Ignore invalid or outdated draft data. */ }
  return { title: "", date: "", location: "", body: "" };
}

function write(value: string) {
  fallback = value;
  try {
    if (value === empty) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    storageUnavailable = true;
  }
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.storageArea === sessionStorage && (event.key === key || event.key === null)) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export default function useInvitationDraft() {
  const serialized = useSyncExternalStore(subscribe, snapshot, () => empty);
  const draft = useMemo(() => parse(serialized), [serialized]);
  const setField = (field: keyof InvitationInput, value: string) => {
    write(JSON.stringify({ ...parse(snapshot()), [field]: value }));
  };
  return { ...draft, setField, clearDraft: () => write(empty) };
}

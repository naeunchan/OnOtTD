import { Storage } from '@apps-in-toss/framework';

export async function getString(key: string) {
  return Storage.getItem(key);
}

export async function setString(key: string, value: string) {
  await Storage.setItem(key, value);
}

export async function removeString(key: string) {
  await Storage.removeItem(key);
}

export async function getJson<T>(key: string): Promise<T | null> {
  const raw = await getString(key);

  if (raw == null || raw.length === 0) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJson<T>(key: string, value: T) {
  await setString(key, JSON.stringify(value));
}


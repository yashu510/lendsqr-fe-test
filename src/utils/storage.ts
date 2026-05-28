import { User } from '../types/user';

const STORAGE_KEY = 'lendsqr_user_details';

export const saveUserToStorage = (user: User): void => {
  try {
    const existing = getUsersFromStorage();
    const updated = { ...existing, [user.id]: user };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save user to storage:', e);
  }
};

export const getUserFromStorage = (id: string): User | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data);
    return parsed[id] || null;
  } catch {
    return null;
  }
};

export const getUsersFromStorage = (): Record<string, User> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

import { api } from '../api/api';

import { keyForLocalStorage } from './constants/keyForLocalStorage';
import { getLocalStorage } from './localStorage/getLocalStorage';

export async function sendDonation(id: string) {
  const token = getLocalStorage(keyForLocalStorage.tokenAuth);
  if (!token) return;
  try {
    await api.contributeToRequest(id, token);
  } catch (e) {}
}

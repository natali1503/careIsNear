import { api } from '../api/api';

import { getLocalStorage } from './localStorage/getLocalStorage';

export async function sendDonation(id: string) {
  const token = getLocalStorage('tokenAuth');
  if (!token) return;
  try {
    await api.contributeToRequest(id, token);
  } catch (e) {}
}

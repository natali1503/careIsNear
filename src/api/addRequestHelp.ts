import { keyForLocalStorage } from '../general/constants/keyForLocalStorage';
import { getLocalStorage } from '../general/localStorage/getLocalStorage';

import { api } from './api';

export async function addRequestHelp(id: string) {
  const token = getLocalStorage(keyForLocalStorage.tokenAuth);
  if (!token) return;
  await api.addToFavourites(id, token);
}

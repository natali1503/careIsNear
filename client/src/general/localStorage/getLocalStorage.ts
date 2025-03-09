export function getLocalStorage(key: string): string | null {
  if (typeof localStorage.getItem(key) === 'string') return localStorage.getItem(key) as string;
  else return null;
}

export const saveToLocalStorage = (key: string, data: object): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`[Storage] 保存失敗: ${e}`);
  }
};

export const loadFromLocalStorage = (key: string): object | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error(`[Storage] 読込失敗: ${e}`);
    return null;
  }
};

export const clearLocalStorageKey = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`[Storage] 削除失敗: ${e}`);
  }
};
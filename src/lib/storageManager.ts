/**
 * ストレージ管理モジュール
 * 
 * 役割:
 * - 保存・読込・削除の抽象化
 * - JSONシリアライズ／デシリアライズの安全化
 * - 型安全な取得APIの提供
 * 
 * 注意:
 * - localStorageを直接操作する場合は本モジュール経由とし、UI層・サービス層からの直接操作は禁止
 * - 例外時は内部で捕捉し、安全に失敗として返す
 */

export class StorageManager {
  /**
   * データを保存する
   * @param key 保存キー
   * @param value 保存する値（シリアライズ可能な型）
   * @returns 保存成功可否
   */
  static save<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`[StorageManager] Save failed for key=${key}`, error);
      return false;
    }
  }

  /**
   * データを取得する
   * @param key 取得キー
   * @returns 取得値 または null
   */
  static load<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) return null;
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`[StorageManager] Load failed for key=${key}`, error);
      return null;
    }
  }

  /**
   * データを削除する
   * @param key 削除キー
   * @returns 削除成功可否
   */
  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[StorageManager] Remove failed for key=${key}`, error);
      return false;
    }
  }

  /**
   * 全ストレージデータをクリアする
   * @returns クリア成功可否
   */
  static clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("[StorageManager] Clear failed", error);
      return false;
    }
  }
}

export default StorageManager;
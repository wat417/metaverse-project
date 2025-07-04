import { getDatabase, onChildRemoved, ref } from 'firebase/database';

export function listenToPlayerRemovals(callback: (uid: string) => void) {
  const db = getDatabase();
  const playersRef = ref(db, 'players');

  onChildRemoved(playersRef, (snapshot) => {
    const uid = snapshot.key;
    if (uid) callback(uid);
  });
}
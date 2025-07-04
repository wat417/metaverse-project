import { onValue, ref, getDatabase } from "firebase/database"; // 🔧 修正
import { PlayerData } from '../types/player';

export const listenToPlayerPositions = (
  currentUid: string,
  onUpdate: (uid: string, x: number, y: number) => void
) => {
  const db = getDatabase();
  const playerRef = ref(db, "players");

  onValue(playerRef, (snapshot) => {
    snapshot.val().name
    snapshot.val().emoji
    snapshot.val().status
    const players = snapshot.val() as Record<string, { x: number; y: number }>;
    if (!players) return;

    Object.entries(players).forEach(([uid, { x, y }]) => {
      if (uid === currentUid) return;
      onUpdate(uid, x, y);
    });
  });
};

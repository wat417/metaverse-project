export function writePlayerData(
  uid: string,
  x: number,
  y: number,
  name: string,
  emoji: string,
  status: string
) {
  const db = getDatabase();
  set(ref(db, 'players/' + uid), {
    x: x,
    y: y,
    name: name,
    emoji: emoji,
    status: status
  });
}
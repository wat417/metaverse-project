// src/firebase/sync.ts

import { getDatabase, ref, set, serverTimestamp } from 'firebase/database'
import { app } from './init'

const db = getDatabase(app)
let lastPosition: { x: number | null; y: number | null } = { x: null, y: null }

export function syncPlayerPosition(uid: string, x: number, y: number) {
  if (x !== lastPosition.x || y !== lastPosition.y) {
    lastPosition = { x, y }

    const playerRef = ref(db, `players/${uid}/position`)
    set(playerRef, {
      x,
      y,
      lastUpdated: serverTimestamp()
    })
  }
}
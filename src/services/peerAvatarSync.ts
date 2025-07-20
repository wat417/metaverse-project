// src/services/peerAvatarSync.ts

export interface RemoteAvatarPayload {
  peerId: string;
  position: { x: number; y: number };
  heading: number;
  status: 'idle' | 'active' | 'disconnected';
}

const remoteAvatars = new Map<string, RemoteAvatarPayload>();

export function initPeerAvatarSync(socket: WebSocket) {
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data?.type === 'avatar:update' && data.payload) {
      updateRemoteAvatar(data.payload);
    }
  });
}

function updateRemoteAvatar(payload: RemoteAvatarPayload) {
  remoteAvatars.set(payload.peerId, payload);
}

export function getRemoteAvatars(): RemoteAvatarPayload[] {
  return Array.from(remoteAvatars.values());
}
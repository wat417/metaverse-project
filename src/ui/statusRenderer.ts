// src/ui/statusRenderer.ts
import { getRemoteAvatars } from '@/services/peerAvatarSync'
import { statusLabels } from '@/utils/statusMap'

export function renderRemoteAvatars(ctx: CanvasRenderingContext2D) {
  const avatars = getRemoteAvatars();
  avatars.forEach((avatar) => {
    const { position, heading, status } = avatar;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate((heading * Math.PI) / 180);

    const icon = getStatusIcon(status);
    ctx.drawImage(icon, -24, -24, 48, 48);

    ctx.restore();
  });
}

function getStatusIcon(status: string): HTMLImageElement {
  const img = new Image();
  switch (status) {
    case 'active':
      img.src = '/icons/avatar-active.png';
      break;
    case 'idle':
      img.src = '/icons/avatar-idle.png';
      break;
    default:
      img.src = '/icons/avatar-disconnected.png';
      break;
  }
  return img;
}

export function renderStatusText(status: string): string {
  return statusLabels[status] || `状態: ${status}`;
}
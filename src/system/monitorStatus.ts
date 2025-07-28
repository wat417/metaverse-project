export type SystemStatus = 'OK' | 'WARN' | 'ERROR';

export function checkSystemHealth(cpuLoad: number, memoryUsage: number): SystemStatus {
  if (cpuLoad < 0.7 && memoryUsage < 0.75) return 'OK';
  if (cpuLoad < 0.9 && memoryUsage < 0.85) return 'WARN';
  return 'ERROR';
}

export function generateHealthAlert(status: SystemStatus): string {
  switch (status) {
    case 'OK':
      return 'System running normally.';
    case 'WARN':
      return 'System under moderate load.';
    case 'ERROR':
      return 'System load critical. Immediate action required.';
  }
}
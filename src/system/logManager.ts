import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve(__dirname, '../../logs');

export function writeLog(message: string): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(path.join(LOG_DIR, 'system.log'), logMessage, 'utf8');
}

export function clearLogs(): void {
  const logPath = path.join(LOG_DIR, 'system.log');
  if (fs.existsSync(logPath)) {
    fs.unlinkSync(logPath);
  }
}
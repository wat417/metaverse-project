import { publishSettings } from '../config/publishConfig';

const buildLogLabel = (type: string, deploy: boolean): string => {
  const base = `[${type.toUpperCase()}`;
  const suffix = deploy ? '+SELECTOR' : '';
  return `${base}${suffix} LOG]`;
};

export const logOutput = (message: string) => {
  if (!publishSettings.enableLogs) return;
  const type = publishSettings.chartType || 'default';
  const deploy = publishSettings.deploySelectorGroup;
  const label = buildLogLabel(type, deploy);
  console.log(`${label} ${message}`);
};
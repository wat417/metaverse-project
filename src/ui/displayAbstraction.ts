import { publishSettings } from '../config/publishConfig';
import { finalizeDisplay } from './finalizeDisplay';

const isSelectorVisible = (type: string): boolean => {
  return type !== 'pie';
};

const getSelectorGroup = (type: string, deploy: boolean): string[] => {
  return deploy ? finalizeDisplay(type) : [];
};

export const getDisplayState = () => {
  const type = publishSettings.chartType || 'default';
  const deploy = publishSettings.deploySelectorGroup;
  return {
    selectorVisible: isSelectorVisible(type),
    selectorGroup: getSelectorGroup(type, deploy)
  };
};
import rulesConfig from './config/filterRules.json';

interface Rule {
  id: string;
  type: string;
  terms: string[];
  enabled: boolean;
}

export function getFilterRules(): Rule[] {
  return Array.isArray(rulesConfig.rules)
    ? rulesConfig.rules.filter((rule) => rule.enabled)
    : [];
}

export function getMaskString(): string {
  return rulesConfig.mask ?? '***';
}
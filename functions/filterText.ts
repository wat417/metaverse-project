// functions/filterText.ts

import rulesConfig from './config/filterRules.json';

interface Rule {
  id: string;
  type: string;
  terms: string[];
  enabled: boolean;
}

export const filterText = (text: string): string => {
  let result = text;
  const activeRules: Rule[] = rulesConfig.rules.filter((rule) => rule.enabled);

  for (const rule of activeRules) {
    for (const term of rule.terms) {
      const regex = new RegExp(term, 'gi');
      result = result.replace(regex, rulesConfig.mask);
    }
  }

  return result;
};
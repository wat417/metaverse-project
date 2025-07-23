import rulesConfig from './config/filterRules.json';

interface Rule {
  id: string;
  type: string;
  terms: string[];
  enabled: boolean;
}

export function applyChatFilter(text: string): { flagged: boolean; masked: string } {
  const activeRules: Rule[] = rulesConfig.rules.filter((r) => r.enabled);
  let flagged = false;
  let maskedText = text;

  for (const rule of activeRules) {
    for (const term of rule.terms) {
      const regex = new RegExp(term, 'gi');
      if (regex.test(maskedText)) {
        flagged = true;
        maskedText = maskedText.replace(regex, rulesConfig.mask || '***');
      }
    }
  }

  return { flagged, masked: maskedText };
}
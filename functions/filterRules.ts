import rulesConfig from './config/filterRules.json';

interface Rule {
  id: string;
  type: string;
  terms: string[];
  enabled: boolean;
}

export const filterText = (text: string): string => {
  const activeRules: Rule[] = Array.isArray(rulesConfig.rules)
    ? rulesConfig.rules.filter((rule) => rule.enabled)
    : [];

  return activeRules.reduce((maskedText, rule) => {
    return rule.terms.reduce((currentText, term) => {
      const regex = new RegExp(term, 'gi');
      return currentText.replace(regex, rulesConfig.mask ?? '***');
    }, maskedText);
  }, text);
};
import * as functions from 'firebase-functions';
import rulesConfig from './config/filterRules.json';

interface Rule {
  id: string;
  type: string;
  terms: string[];
  enabled: boolean;
}

export const chatFilter = functions.https.onCall(
  (data: any, context): { result: string } => {
    const inputText: string = typeof data?.text === 'string' ? data.text : '';
    const result = applyFilter(inputText);
    return { result };
  }
);

function applyFilter(text: string): string {
  const activeRules: Rule[] = Array.isArray(rulesConfig.rules)
    ? rulesConfig.rules.filter((rule: Rule) => rule.enabled)
    : [];

  return activeRules.reduce((maskedText, rule) => {
    return rule.terms.reduce((currentText, term) => {
      const regex = new RegExp(term, 'gi');
      return currentText.replace(regex, rulesConfig.mask ?? '***');
    }, maskedText);
  }, text);
}
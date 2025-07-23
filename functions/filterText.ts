import { getFilterRules, getMaskString } from './filterRules';

export function normalizeText(text: string): string {
  return text
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .toLowerCase();
}

export function filterText(text: string): string {
  const rules = getFilterRules();
  const mask = getMaskString();
  let result = text;

  for (const rule of rules) {
    for (const term of rule.terms) {
      const regex = new RegExp(term, 'gi');
      result = result.replace(regex, mask);
    }
  }

  return result;
}
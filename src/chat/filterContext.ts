import { getFilterRules, getMaskString } from "../../functions/filterRules";

export function applyFilteredText(inputText: string, isAnonymous: boolean): {
  flagged: boolean;
  masked: string;
  matchedTerms: string[];
} {
  const rules = getFilterRules();
  const mask = getMaskString();

  let flagged = false;
  let masked = inputText;
  const matchedTerms: string[] = [];

  rules.forEach((rule) => {
    if (rule.anonymousOnly && !isAnonymous) return;

    rule.terms.forEach((term) => {
      const regex = new RegExp(term, "gi");
      if (regex.test(masked)) {
        flagged = true;
        matchedTerms.push(term);
        masked = masked.replace(regex, mask);
      }
    });
  });

  return { flagged, masked, matchedTerms };
}
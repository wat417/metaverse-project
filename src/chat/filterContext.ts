import { getFilterRules, getMaskString } from "../../functions/filterRules";

export function applyFilteredText(inputText: string, isAnonymous: boolean): {
  flagged: boolean;
  masked: string;
} {
  const rules = getFilterRules();
  const mask = getMaskString();

  let flagged = false;
  let masked = inputText;

  rules.forEach((rule) => {
    if (rule.anonymousOnly && !isAnonymous) return;

    rule.terms.forEach((term) => {
      const regex = new RegExp(term, "gi");
      if (regex.test(masked)) {
        flagged = true;
        masked = masked.replace(regex, mask);
      }
    });
  });

  return { flagged, masked };
}
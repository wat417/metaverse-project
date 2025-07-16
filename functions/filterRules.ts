import * as fs from 'fs';
import * as path from 'path';

const rulesPath = path.join(__dirname, './config/filterRules.json');
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

export const filterText = (text: string): string => {
  let result = text;
  for (const word of rules.ngWords) {
    const regex = new RegExp(word, 'gi');
    result = result.replace(regex, rules.mask);
  }
  return result;
};
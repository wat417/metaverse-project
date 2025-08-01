import { publishSettings } from "../config/publishConfig";

export function logOutput(message: string) {
  if (publishSettings.enableLogging) {
    console.log(`[OutputLog]: ${message}`);
  }
}
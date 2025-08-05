import { copyFileSync } from "fs";
import { resolve } from "path";

const source = resolve("dist/index.html");
const destination = resolve("dist/404.html");

try {
  copyFileSync(source, destination);
  console.log("✅ dist/404.html copied successfully.");
} catch (error) {
  console.error("❌ Failed to copy index.html to 404.html:", error);
  process.exit(1);
}

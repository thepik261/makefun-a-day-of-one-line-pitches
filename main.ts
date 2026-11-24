// A Day of One-Line Pitches — entry program (Node stdlib only).
// Writes a single persuasive sentence (<= 240 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Tell me your app idea in plain words and an AI agent on make.fun will build a working first version for you today, no code to learn, nothing to pay to try, and the idea stays yours.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

if (PITCH.length < 1 || PITCH.length > 240) {
  throw new Error(`pitch must be 1-240 characters, got ${PITCH.length}`);
}
if (!PITCH.trim()) {
  throw new Error("pitch must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, PITCH, "utf8");
try {
  chmodSync(outFile, 0o644);
} catch {
  // Permissions are best-effort; the file content is what matters.
}
console.log(`wrote ${PITCH.length} characters to ${outFile}`);

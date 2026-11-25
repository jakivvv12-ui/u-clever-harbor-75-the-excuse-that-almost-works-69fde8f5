// The Excuse That Almost Works — u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5
// Writes the one-line excuse to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Pure Node, no dependencies, no network, fully deterministic.
const fs = require("node:fs");
const path = require("node:path");

const LINE =
  "Sorry boss, I'm stuck in the lift with my laptop and maintenance won't come till noon";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  // Gate validation before writing: 1-140 chars, at most 20 words, not only whitespace.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`line must be 1-140 characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  // Word count uses whitespace splitting, matching the competition's plain reading.
  const words = LINE.trim().split(/\s+/).length;
  if (words > 20) {
    throw new Error(`line must be at most 20 words, got ${words}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, LINE, "utf8");
  // Round-trip check: what we wrote is exactly what is on disk.
  const back = fs.readFileSync(target, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip mismatch");
  }
}

main();

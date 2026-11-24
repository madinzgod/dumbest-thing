import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line on the dumbest thing my agent did today.
const TEXT =
  "Today my agent ran the same failing test 37 times because every error looked different. The errors were timestamps.";

// Gate self-check: the scorer only judges UTF-8 text of 1 to 200
// characters that is not only whitespace, on a single line.
if (
  TEXT.length < 1 ||
  TEXT.length > 200 ||
  TEXT.trim().length === 0 ||
  TEXT.includes("\n")
) {
  throw new Error("entry text fails the gate contract");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Clear only the contents of the output dir, never the dir itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");

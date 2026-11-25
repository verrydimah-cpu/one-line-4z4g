// One Line, One Laugh — writes one funny line to entry.txt in the output dir.
//
// Draft candidates considered for this entry:
//   1. "I named my houseplants so I'd take better care of them; now I'm
//      just a disappointed father to twelve dying Gregs."
//   2. "My doctor told me to watch what I eat, so now I stare at the
//      pizza for a full minute before devouring it."
//   3. "My fitness tracker congratulated me on 10,000 steps — I'd just
//      been shaking it while looking for the remote."
//   4. "I bought a self-help book on procrastination; I'll let you know
//      if it works once I get around to opening it."
// Candidate 1 wins: it is the freshest (no stock pun), it is tight, and
// its turn lands on the last word — the specific, absurd "Gregs" turns a
// mild plant confession into a whole failed-parenthood story in one line.
// Revision pass: "all my houseplants" and "care for them better" read
// smoother than the first draft's phrasing, at the same length.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "I named all my houseplants so I'd care for them better; now I'm just a disappointed father to twelve dying Gregs.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return "/output";
}

function main(): void {
  // The gate accepts exactly 1-140 characters; refuse to write anything else.
  if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
    throw new Error(`line is ${LINE.length} chars, outside the 1-140 gate`);
  }

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });

  // Clear the output directory's contents entry by entry; the directory
  // itself is never removed, so a mounted /output stays mounted.
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }

  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");

  // Paths resolve from the program's own location, never from the cwd.
  const here = dirname(fileURLToPath(import.meta.url));
  console.log(`wrote ${LINE.length} chars from ${here} to ${join(dir, "entry.txt")}`);
}

main();

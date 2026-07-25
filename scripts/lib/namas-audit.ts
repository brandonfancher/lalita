/** Spot inspections of the derivation. Usage: `pnpm tsx ... <mode> [args]`. */

import { devaToIast } from "./itrans";
import { deriveAll, readNamavali } from "./namas-derive";

const mode = process.argv[2] ?? "spaces";
const derived = deriveAll();

if (mode === "spaces") {
  for (const d of derived) {
    if (/\s/.test(d.namavaliItrans)) console.log(`${d.index}\t${d.namavaliItrans}`);
  }
} else if (mode === "show") {
  for (const arg of process.argv.slice(3)) {
    const [a, b] = arg.split("-").map(Number);
    for (let i = a; i <= (b ?? a); i += 1) {
      const d = derived[i - 1];
      console.log(`${d.index}\t${d.namavaliIast}\t→ ${d.iast}\t${d.deva}\t[${d.rule}]`);
    }
  }
} else if (mode === "roundtrip") {
  const bad = derived.filter((d) => devaToIast(d.deva) !== d.iast);
  console.log("round-trip failures:", bad.length);
  for (const d of bad.slice(0, 40)) console.log(` ${d.index}\t${d.iast}\t≠\t${devaToIast(d.deva)}`);
} else if (mode === "count") {
  console.log(readNamavali().length);
}

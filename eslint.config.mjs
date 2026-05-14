import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ESLint v9 may need to serialize the loaded config (ex: Next.js build-time linting).
// Next's bundled Babel parser doesn't currently expose meta data, so we attach it here.
const require = createRequire(import.meta.url);
try {
  const nextPkg = require("next/package.json");
  const nextBabelParser = require("eslint-config-next/parser");

  nextBabelParser.meta ??= {};
  nextBabelParser.meta.name ??= "next/babel";
  nextBabelParser.meta.version ??= nextPkg.version;
} catch {
  // Best-effort: if this fails, ESLint may still work, but config serialization can warn.
}

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;

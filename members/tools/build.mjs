import { build } from "esbuild";

const root = new URL("../", import.meta.url);
await build({
  entryPoints: [
    new URL("../src/member-core.ts", import.meta.url).pathname,
    new URL("../src/member-validation.ts", import.meta.url).pathname,
    new URL("../src/member-api.ts", import.meta.url).pathname,
    new URL("../src/member-state.ts", import.meta.url).pathname,
    new URL("../src/member-auth.ts", import.meta.url).pathname,
    new URL("../src/member-apps.ts", import.meta.url).pathname,
    new URL("../src/member-preferences.ts", import.meta.url).pathname
  ],
  outdir: new URL("../dist/", import.meta.url).pathname,
  bundle: false,
  format: "esm",
  target: "es2022",
  sourcemap: true,
  logLevel: "info"
});
console.log("Spydr Members TypeScript modules built.");

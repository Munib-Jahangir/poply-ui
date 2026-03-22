import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import fs from "fs";

const commonPlugins = [
  nodeResolve(),
  commonjs(),
  postcss({
    extract: "poply-ui.css",
    minimize: true,
  }),
  typescript({
    tsconfig: "./tsconfig.json",
    useTsconfigDeclarationDir: true,
  }),
];

export default [
  // ESM and CJS builds for all entry points
  {
    input: {
      "poply-ui": "src/index.ts",
      "adapters/react/index": "src/adapters/react/index.tsx",
      "adapters/vue/index": "src/adapters/vue/index.ts",
      "adapters/svelte/index": "src/adapters/svelte/index.ts",
    },
    output: [
      {
        dir: "dist",
        format: "es",
        entryFileNames: "[name].esm.js",
      },
      {
        dir: "dist",
        format: "cjs",
        entryFileNames: "[name].cjs.js",
        exports: "named",
      },
    ],
    external: ["react", "vue", "svelte"],
    plugins: commonPlugins,
  },
  // UMD build for the browser (only main entry point)
  {
    input: "src/index.ts",
    output: {
      file: "dist/poply-ui.umd.min.js",
      format: "umd",
      name: "Poply",
      plugins: [terser()],
      exports: "named",
    },
    plugins: commonPlugins,
  },
];

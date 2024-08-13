import { JestConfigWithTsJest } from "ts-jest";
import dotenv from "dotenv";
dotenv.config();

const env: Record<string, unknown> = {};

for (const key in process.env) {
  if (key.startsWith("VITE_")) env[key] = process.env[key];
}

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: { env },
              },
            },
          ],
        },
      },
    ],
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/types/**/*.{js,jsx,ts,tsx}",
    "!src/**/interfaces/**/*.{js,jsx,ts,tsx}",
    "!src/**/enums/**/*.{js,jsx,ts,tsx}",
    "!src/**/index.ts",
    "!src/vite-env.d.ts",
    "!src/main.tsx",
    "!src/config/**/*.{js,jsx,ts,tsx}",
  ],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default jestConfig;

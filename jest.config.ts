import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next-mdx-remote/serialize$": "<rootDir>/src/__mocks__/next-mdx-remote-serialize.ts",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(next-mdx-remote)/)",
  ],
};

export default createJestConfig(config);

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  modulePathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.(test|spec).ts?(x)"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
};

export default config;

const config = {
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  testMatch: process.env.JEST_ENV == "e2e" ? ["**/*.e2e.ts"] : ["**/*.spec.ts"],
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { useEsm: true }],
  },
  preset: "ts-jest/presets/js-with-ts-esm",
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  testTimeout: 600000,
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  modulePaths: ["<rootDir>"],
};

export default config;

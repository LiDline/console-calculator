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
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  testTimeout: 600000,
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: ["/node_modules/(?!superjson)(.*)"],
};

export default config;

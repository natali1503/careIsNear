/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
    "^.+\\.vue$": ["@vue/vue3-jest", {}],
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["vue", "js", "ts", "jsx", "tsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};

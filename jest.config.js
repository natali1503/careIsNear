/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "jsdom", // Для тестирования DOM
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest", // Для Vue
    "^.+\\.tsx?$": ["ts-jest", {}], // Для TypeScript
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Для алиасов, если вы их используете
  },
};

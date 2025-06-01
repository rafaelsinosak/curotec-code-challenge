module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/*.test.(ts|tsx)",
    "<rootDir>/src/**/*.spec.(ts|tsx)"
  ],
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest"
  },

  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/).*"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  }
};

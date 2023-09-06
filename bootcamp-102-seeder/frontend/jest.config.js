module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  passWithNoTests: true,
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: ["/node_modules/", "/services/", "/utils/"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/jest/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/test/jest/__mocks__/styleMock.js",
  },
};

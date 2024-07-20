// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Optionally add more configuration options here
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};

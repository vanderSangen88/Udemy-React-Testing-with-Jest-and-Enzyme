module.exports = {
  ...jest.requireActual(".."),
  __esModule: true,
  // TODO: update return value
  getSecretWord: jest.fn().mockReturnValue(Promise.resolve("party")),
};

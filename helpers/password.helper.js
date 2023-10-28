const crypto = require("crypto");
const salt = "AmberWood";

module.exports.setPassword = (password) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};

module.exports.verifyPassword = (password, oldHash) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return hash === oldHash;
};

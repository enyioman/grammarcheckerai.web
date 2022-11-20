const bcrypt = require("bcrypt");
async function comparePassword(password, hash) {
  const isCorrect = await bcrypt.compare(password, hash);
  return isCorrect;
}

module.exports = { comparePassword };

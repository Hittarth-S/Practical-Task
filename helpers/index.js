const Users = require("../models/users.model");

async function generateRandomString(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function generateNumericString(length) {
  var result = "";
  var characters = "123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function getUniqueUserId(reg) {
  return new Promise(async (resolve) => {
    var randomString = await generateRandomString(6);

    let checkUserName = await Users.findOne({
      userName: randomString,
    });

    if (!checkUserName) {
      resolve(randomString);
    } else {
      await getUniqueUserId(generateRandomString(6));
    }
  });
}


module.exports.generateRandomString = generateRandomString;
module.exports.generateNumericString = generateNumericString;
module.exports.getUniqueUserId = getUniqueUserId;

const { execute } = require("../Config/DataBase");
const bcrypt = require("bcrypt");

const checkUserPassword = async (pass) => {
  const getUserPassword = "SELECT password FROM pass";
  try {
    const userPassword = await execute(getUserPassword);
    return bcrypt.compare(
      pass.toString(),
      userPassword[0][0].password.toString()
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkUserPassword };

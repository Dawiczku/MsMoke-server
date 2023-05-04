const { mysqlPool } = require("../Config/DataBase");
const { getItems } = require("./GetItems");

const changePrice = async (newPrice, id) => {
  try {
    const connection = await mysqlPool.getConnection();
    await connection.query(
      "UPDATE produkty SET produkt_cena = (?) WHERE produkt_id = (?)",
      [newPrice, id]
    );
    connection.release();
    return getItems();
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { changePrice };

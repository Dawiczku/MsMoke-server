const { mysqlPool } = require("../Config/DataBase");
const { getItems } = require("./GetItems");

const deleteItem = async (id) => {
  try {
    const connection = await mysqlPool.getConnection();
    await connection.query("DELETE FROM produkty WHERE produkt_id = (?)", [id]);
    connection.release();
    return getItems();
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { deleteItem };

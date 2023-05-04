const { mysqlPool } = require("../Config/DataBase");

const getItems = async () => {
  try {
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.query("SELECT * FROM produkty");
    rows.forEach((row) => {
      return (row.produkt_foto = `http://${process.env.HOST}:${process.env.PORT}/${row.produkt_foto}`);
    });
    connection.release();

    return rows;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { getItems };

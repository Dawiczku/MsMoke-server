const { mysqlPool } = require("../Config/DataBase");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const addProduct = async (name, price, flavour, nicotine, filename, type) => {
  try {
    const connection = await mysqlPool.getConnection();
    connection.query(
      "INSERT INTO produkty(produkt_id, produkt_nazwa, produkt_cena, produkt_smak, produkt_moc, produkt_foto, produkt_typ) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [uuidv4(), name, price, flavour, nicotine, filename, type]
    );
    connection.release();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { addProduct };

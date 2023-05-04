require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const { addProduct } = require("./src/Helpers/AddProduct");
const { checkUserPassword } = require("./src/Helpers/CheckPassword");
const { getItems } = require("./src/Helpers/GetItems");
const { deleteItem } = require("./src/Helpers/DeleteItem");
const { changePrice } = require("./src/Helpers/ChangePrice");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/imagesMsmoke");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "./src/imagesMsmoke")));

app.get("/getItems", (req, res) => {
  getItems().then((items) => {
    if (items) {
      items.sort((prev, next) =>
        prev.produkt_nazwa.localeCompare(next.produkt_nazwa)
      );

      res.send({ success: true, items });
    } else {
      res.send({ success: false, items: null });
    }
  });
});

app.post("/changePrice", (req, res) => {
  const { newPrice, id } = req.body;
  changePrice(newPrice, id).then((items) => {
    if (items) {
      items.sort((prev, next) =>
        prev.produkt_nazwa.localeCompare(next.produkt_nazwa)
      );
      res.send({ success: true, items });
    } else {
      res.send({ success: false, items: null });
    }
  });
});

app.delete("/deleteItem", (req, res) => {
  const { id } = req.body;
  deleteItem(id).then((items) => {
    if (items) {
      items.sort((prev, next) =>
        prev.produkt_nazwa.localeCompare(next.produkt_nazwa)
      );
      res.send({ success: true, items });
    } else {
      res.send({ success: false, items: null });
    }
  });
});

app.post("/login", (req, res) => {
  const password = req.body.password;
  checkUserPassword(password).then((result) => {
    if (result === true) {
      res.send({ success: true });
    } else {
      res.send({ success: false, message: "Wrong password" });
    }
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  const { name, flavour, nicotine, price, type } = req.body;
  const { filename } = req.file;
  addProduct(name, price, flavour, nicotine, filename, type).then((result) => {
    if (result === true) {
      res.send({ success: true });
    } else {
      res.send({ success: false, message: "Server error" });
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

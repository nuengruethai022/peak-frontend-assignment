const express = require("express");
const app = express();

var cors = require("cors");

app.use(cors());

let jsonData = require("./db.json");

app.get("/", function (req, res) {
  res.send(jsonData);
});

app.get("/products", function (req, res) {
  res.send(jsonData);
});

app.get("/products/:id", function (req, res) {
  res.send(jsonData.products.find((product) => product.id === parseInt(req.params.id)));
});

app.listen(3000, function () {
  console.log("Aplicación de pruebas escuchando en el puerto 3000!");
});

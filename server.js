const express = require("express");
const config = require("./config.js");
const cors = require("cors");

const app = express();

app.use(cors());

app.listen(config.api.port, () => {
  console.log("Servidor iniciado con éxito en el puerto ", config.api.port);
});

app.use("/v1", require("./routes/v1"));

module.exports = app;

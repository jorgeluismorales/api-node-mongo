require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const meals = require("./routes/meals");
const orders = require("./routes/orders");
const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("* MongoDB conectado correctamente");
  })
  .catch(err => {
    console.log("* MongoDB error a conectarse. " + err);
  });

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "localhost");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/meals", meals);
app.use("/api/orders", orders);

app.listen(app.get("port"), () => {
  console.log(
    "* La aplicación está andando en http://%s:%d en modo '%s'",
    app.get("host"),
    app.get("port"),
    app.get("env")
  );
  console.log(" [CTRL-C para detener]\n");
});

module.exports = app;

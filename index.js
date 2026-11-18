require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const sequelize = require("./config/database");
require("./models/Lead");
require("./models/Company");
require("./models/Utilizador");
const app = express();
const errorHandler = require("./utils/errorsHandler");
app.use(express.json());
app.use(cors());
app.use("/lead", require("./routers/leadRoute"));
app.use("/company", require("./routers/companyRoute"));
app.use("/utilizador", require("./routers/utilizadorRoute"));
app.use(errorHandler);
// O { force: true } apaga a tabela existente (se houver) e cria uma nova
/*sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tabela recriada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar:", error);
  });*/
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(PORT, () => console.log(`Aplication listening on port ${PORT} `));

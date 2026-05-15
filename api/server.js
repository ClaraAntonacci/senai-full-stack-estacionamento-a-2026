require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// const routes = require('./src/routes');

app.use(cors());
app.use(express.json());
// app.use(routes);

 const estadiaRoutes = require("./src/routes/estadia.routes");
// const veiculoRoutes = require("./src/routes/veiculo.routes");

// app.use("/", estadiaRoutes);
// app.use("/", veiculoRoutes);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
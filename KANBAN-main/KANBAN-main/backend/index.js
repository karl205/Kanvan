const express = require('express');
const bodyParser = require('body-parser');
const conectarDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


const app = express();
const PORT = 5000;

conectarDB();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});

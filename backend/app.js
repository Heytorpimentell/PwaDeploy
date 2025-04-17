const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Importa o middleware cors
const complaintsRoute = require("./routes/complaints");

dotenv.config();

const app = express();

app.use(cors()); // Ativa o CORS para todas as rotas

// Caso fosse limitar o acesso do CORS
// const corsOptions = {
//     origin: 'http://127.0.0.1:5500',
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

app.use(express.json());

async function conectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado com o banco de dados");
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados:", error);
  }
}

const port = process.env.PORT || 3000;

conectToDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

app.use("/api/complaints", complaintsRoute);

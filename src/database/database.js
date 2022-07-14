import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("conectando com o DB");

  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Conectado");
    })
    .catch((err) => console.log("Erro ao conectar"));
};

export { connectDatabase };

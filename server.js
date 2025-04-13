import server from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

process.on("uncaughtException", (error) => {
  console.error("Error no manejado:", error);
  process.exit(1); // Apaga el proceso para evitar que continúe corriendo con errores
});

server(PORT);
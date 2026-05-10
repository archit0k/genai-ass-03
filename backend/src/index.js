import "dotenv/config";
import express from "express";
import cors from "cors";
import ragRoutes from "./routes/rag.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/rag", ragRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "NotebookLM RAG Backend Running"
  });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
};

start();

import express from "express";
import multer from "multer";
import { ingestDocument } from "../services/ingest.service.js";
import { askQuestion } from "../services/chat.service.js";

const router = express.Router();

const upload = multer({
  dest: "src/uploads/"
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const chunkCount = await ingestDocument(req.file.path);

    res.json({
      success: true,
      message: "Document uploaded successfully",
      chunks: chunkCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await askQuestion(question);

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

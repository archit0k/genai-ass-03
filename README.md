# NotebookLM RAG Application

A Retrieval-Augmented Generation (RAG) application inspired by Google NotebookLM that allows users to upload PDF documents and interact with them through natural language conversations.

The application processes uploaded documents, converts them into vector embeddings, stores them in a vector database, retrieves the most relevant document chunks for a user query, and generates grounded responses using an LLM.

---

# Project Overview

This project demonstrates a complete end-to-end RAG pipeline implementation using modern AI engineering tools and frameworks.

The system ensures that generated answers are grounded in the uploaded document content rather than relying on the model's general knowledge.

The application supports:

* PDF document upload
* Automatic document parsing and chunking
* Embedding generation
* Vector similarity search
* Context-aware answer generation
* Full-stack deployment

---

# Features

## Document Upload

Users can upload PDF documents directly from the frontend interface.

## Document Processing

Uploaded documents are:

* Parsed
* Split into chunks
* Converted into embeddings
* Indexed into a vector database

## Semantic Retrieval

The application retrieves the most relevant document chunks based on the user's question.

## Grounded AI Responses

Responses are generated strictly using retrieved document context to reduce hallucinations.

## Modern Full-Stack Architecture

The project is built using a separate frontend and backend architecture for scalability and maintainability.

---

# Tech Stack

## Frontend

* React
* Vite
* Axios
* CSS

## Backend

* Node.js
* Express.js
* Multer
* CORS

## AI / RAG Stack

* LangChain
* OpenAI-Compatible API (AICredits)
* GPT-4.1 Mini
* OpenAI Embeddings
* Qdrant Vector Database

## Deployment

* Frontend: Vercel
* Backend: Render
* Vector Database: Qdrant Cloud

---

# System Architecture

```text
User Uploads PDF
        ↓
PDF Loader
        ↓
Text Chunking
        ↓
Embedding Generation
        ↓
Qdrant Vector Database
        ↓
Retriever
        ↓
Relevant Context Chunks
        ↓
LLM (GPT-4.1 Mini)
        ↓
Grounded Response
```

---

# RAG Pipeline Explanation

## 1. Document Ingestion

The uploaded PDF document is processed using LangChain's PDF loader.

## 2. Chunking Strategy

The document is split using RecursiveCharacterTextSplitter.

### Chunking Configuration

* Chunk Size: 1000
* Chunk Overlap: 200

This strategy preserves semantic continuity while ensuring chunks remain small enough for efficient embedding and retrieval.

## 3. Embedding Generation

Each chunk is converted into vector embeddings using OpenAI-compatible embedding models.

Embedding Model Used:

```text
text-embedding-3-small
```

## 4. Vector Storage

Embeddings are stored inside Qdrant Cloud for semantic similarity search.

## 5. Retrieval

When a user asks a question:

* The query is embedded
* Similar chunks are retrieved from Qdrant
* Top matching chunks are passed to the LLM

## 6. Response Generation

GPT-4.1 Mini generates an answer using only the retrieved context.

The system prompt explicitly instructs the model to:

* Answer only from context
* Avoid hallucinations
* Return fallback responses if information is unavailable

---

# Folder Structure

```text
genai-ass-03/
│
├── frontend/
│   ├── src/
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── services/
│   │   └── uploads/
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# API Endpoints

## Upload Document

### Endpoint

```http
POST /api/rag/upload
```

### Description

Uploads and indexes a PDF document.

---

## Ask Question

### Endpoint

```http
POST /api/rag/chat
```

### Request Body

```json
{
  "question": "What is this document about?"
}
```

### Description

Retrieves relevant chunks and generates a grounded answer.

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.aicredits.in/v1

OPENAI_MODEL=gpt-4.1-mini
EMBEDDING_MODEL=text-embedding-3-small

QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION=notebooklm
```

---

# Local Setup

## Clone Repository

```bash
git clone <repo-url>
cd genai-ass-03
```

---

# Backend Setup

```bash
cd backend
npm install --legacy-peer-deps
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Deployment

## Frontend Deployment

The frontend is deployed using Vercel.

## Backend Deployment

The backend is deployed using Render.

## Vector Database

Qdrant Cloud is used as the hosted vector database.

---

# Live Project Links

## Frontend

PASTE_FRONTEND_URL_HERE

## Backend

PASTE_BACKEND_URL_HERE

---

# Challenges Faced

During development, several challenges were encountered:

* Handling ESM module compatibility issues
* Managing LangChain dependency conflicts
* Configuring environment variables correctly for ESM imports
* Integrating OpenAI-compatible APIs using custom base URLs
* Deploying a monorepo structure with separate frontend and backend directories

These issues were resolved through proper dependency management and environment configuration.

---

# Future Improvements

Potential future enhancements include:

* Support for multiple uploaded documents
* Chat history persistence
* Source citation display
* Streaming responses
* Authentication system
* Better UI/UX design
* Multi-format document support
* Hybrid search retrieval

---

# Learning Outcomes

This project helped in understanding:

* Retrieval-Augmented Generation architecture
* Vector databases and semantic search
* Embedding generation workflows
* Context-grounded LLM prompting
* Full-stack AI application development
* AI application deployment workflows

---

# Author

Archit Kulkarni

---

# License

This project is developed for educational purposes as part of Assignment 03.

import { useState } from "react";
import API from "./api";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    try {
      await API.post("/upload", formData);

      alert("Document uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  const handleAsk = async () => {
    if (!question) return;

    setLoading(true);

    try {
      const response = await API.post("/chat", {
        question
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert("Question failed");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>NotebookLM RAG</h1>

      <div className="card">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>
          Upload Document
        </button>
      </div>

      <div className="card">
        <textarea
          placeholder="Ask a question about the document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={handleAsk}>
          Ask Question
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {answer && (
        <div className="answer">
          <h3>Answer</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;

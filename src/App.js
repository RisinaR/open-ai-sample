import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="main">
      <div className="container">
        <textarea
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write your prompt.."
          className="textarea"
        />
        <button
          onClick={handleClick}
          disabled={loading || prompt.length === 0}
          className="btn"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <div className="result">{result}</div>
      </div>
    </main>
  );
}

export default App;

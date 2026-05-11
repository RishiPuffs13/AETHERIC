import React, { useState } from "react";

// Basic Aetheric dictionary (expanded from Codex)
const engToAetheric = {
  get: "Iu",
  obtain: "Iu",
  you: "Tr",
  your: "Tr-Xy",
  here: "AëØ",
  verification: "QorVnXy",
  verify: "QorVn",
  system: "Vn",
  truth: "Qor",
  energy: "Lm",
  light: "Lm",
  motion: "Iu",
  connect: "Tr",
  connection: "Tr",
  machine: "Vn",
  error: "Zk",
  danger: "Zk",
  void: "Ø",
  exist: "Aë",
  being: "Aë"
};

// Reverse map
const aethericToEng = Object.entries(engToAetheric).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

function translateEnglishToAetheric(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map(word => engToAetheric[word] || word)
    .join(" ");
}

function translateAethericToEnglish(text) {
  return text
    .split(/\s+/)
    .map(token => aethericToEng[token] || token)
    .join(" ");
}

export default function AethericTranslator() {
  const [direction, setDirection] = useState("en-to-ae");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleTranslate = () => {
    if (direction === "en-to-ae") {
      setOutput(translateEnglishToAetheric(input));
    } else {
      setOutput(translateAethericToEnglish(input));
    }
  };

  const swapDirection = () => {
    setDirection(prev => (prev === "en-to-ae" ? "ae-to-en" : "en-to-ae"));
    setInput("");
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 font-mono">
      <h1 className="text-2xl mb-4">Aetheric Translator Terminal</h1>

      <button
        onClick={swapDirection}
        className="mb-4 px-4 py-2 border border-green-400"
      >
        Switch Direction ({direction === "en-to-ae" ? "English → Aetheric" : "Aetheric → English"})
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          className="w-full h-40 p-2 bg-black border border-green-400"
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <textarea
          className="w-full h-40 p-2 bg-black border border-green-400"
          placeholder="Output..."
          value={output}
          readOnly
        />
      </div>

      <button
        onClick={handleTranslate}
        className="mt-4 px-6 py-2 bg-green-400 text-black font-bold"
      >
        TRANSLATE
      </button>

      <div className="mt-6 text-sm opacity-70">
        Status: Aetheric Lexicon Node Active
      </div>
    </div>
  );
}

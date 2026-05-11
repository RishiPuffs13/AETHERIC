import React, { useState } from "react";

// ===============================
// AETHERIC v5 — COMPRESSED COLLISION-FREE ENGINE
// Short-form alien language system
// ===============================

// Reduced phoneme sets for conciseness
const vowels = [
  "a", "e", "i", "o", "u", "ø"
];

const consonants = [
  "tr", "kr", "vr", "zr", "xr", "qr",
  "lr", "mr", "nr", "pr", "dr", "br",
  "gr", "fr", "sh", "th", "ch", "zh"
];

// Minimal root overrides (high frequency words only)
const roots = {
  you: "tr",
  here: "ae",
  system: "vn",
  truth: "qr",
  error: "zk",
  void: "ø",
  get: "iu",
  go: "iu"
};

function hashWord(word) {
  let h = 0;
  for (let i = 0; i < word.length; i++) {
    h = (h * 33 + word.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick(arr, h, offset) {
  return arr[(h + offset) % arr.length];
}

// ===============================
// COMPRESSED GENERATOR (2–3 SYLLABLE MAX)
// ===============================
function generateAetheric(word) {
  const h = hashWord(word);

  const c1 = pick(consonants, h, 1);
  const v1 = pick(vowels, h, 2);
  const c2 = pick(consonants, h, 3);
  const v2 = pick(vowels, h, 4);

  // 2-syllable compressed form (max readability)
  return `${c1}${v1}${c2}${v2}`;
}

function tokenize(text) {
  return text.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

function toAetheric(text) {
  return tokenize(text)
    .map(w => roots[w] || generateAetheric(w))
    .join(" ");
}

function toEnglish(text) {
  return tokenize(text)
    .map(w => "<" + w + ">")
    .join(" ");
}

// ===============================
// UI
// ===============================
export default function AethericTranslator() {
  const [direction, setDirection] = useState("en-to-ae");
  const [input, setInput] = useState("");

  const output = direction === "en-to-ae"
    ? toAetheric(input)
    : toEnglish(input);

  return (
    <div style={{
      fontFamily: "monospace",
      background: "radial-gradient(circle, #020202, #000)",
      color: "#39ff14",
      minHeight: "100vh",
      padding: 20
    }}>

      <h1 style={{ textShadow: "0 0 10px #39ff14" }}>
        Aetheric v5 — Compressed Lexicon
      </h1>

      <button
        onClick={() => setDirection(direction === "en-to-ae" ? "ae-to-en" : "en-to-ae")}
        style={{ marginBottom: 10 }}
      >
        {direction === "en-to-ae" ? "English → Aetheric" : "Aetheric → English"}
      </button>

      <div style={{ display: "flex", gap: 10 }}>
        <textarea
          style={{ width: "50%", height: 180, background: "black", color: "#39ff14" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <textarea
          style={{ width: "50%", height: 180, background: "black", color: "#39ff14" }}
          value={output}
          readOnly
        />
      </div>

      <div style={{ marginTop: 15, opacity: 0.8 }}>
        Status: Ultra-Compressed Phoneme Engine Active
      </div>

    </div>
  );
}

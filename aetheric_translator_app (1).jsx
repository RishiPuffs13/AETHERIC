<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aetheric Translator Terminal</title>
  <style>
    body {
      margin: 0;
      font-family: monospace;
      background: black;
      color: #39ff14;
      padding: 20px;
    }
    h1 {
      font-size: 22px;
    }
    textarea {
      width: 100%;
      height: 160px;
      background: black;
      color: #39ff14;
      border: 1px solid #39ff14;
      padding: 10px;
      font-family: monospace;
      resize: none;
    }
    button {
      background: #39ff14;
      color: black;
      border: none;
      padding: 10px 15px;
      margin-top: 10px;
      cursor: pointer;
      font-weight: bold;
    }
    .row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .col {
      flex: 1;
      min-width: 300px;
    }
    .status {
      margin-top: 15px;
      opacity: 0.7;
    }
  </style>
</head>
<body>

<h1>Aetheric Translator Terminal</h1>

<button onclick="swapDirection()" id="swapBtn">
  English → Aetheric
</button>

<div class="row">
  <div class="col">
    <textarea id="input" placeholder="Enter text..."></textarea>
  </div>
  <div class="col">
    <textarea id="output" placeholder="Output..." readonly></textarea>
  </div>
</div>

<button onclick="translateText()">TRANSLATE</button>

<div class="status" id="status">Status: Aetheric Lexicon Node Active</div>

<script>
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

const aethericToEng = Object.entries(engToAetheric).reduce((acc, [k, v]) => {
  acc[v.toLowerCase()] = k;
  return acc;
}, {});

let direction = "en-to-ae";

function translateEnglishToAetheric(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map(w => engToAetheric[w] || w)
    .join(" ");
}

function translateAethericToEnglish(text) {
  return text
    .split(/\s+/)
    .map(t => aethericToEng[t.toLowerCase()] || t)
    .join(" ");
}

function translateText() {
  const input = document.getElementById("input").value;
  let output = "";

  if (direction === "en-to-ae") {
    output = translateEnglishToAetheric(input);
  } else {
    output = translateAethericToEnglish(input);
  }

  document.getElementById("output").value = output;
}

function swapDirection() {
  direction = direction === "en-to-ae" ? "ae-to-en" : "en-to-ae";
  document.getElementById("swapBtn").innerText =
    direction === "en-to-ae" ? "English → Aetheric" : "Aetheric → English";

  document.getElementById("input").value = "";
  document.getElementById("output").value = "";
}
</script>

</body>
</html>
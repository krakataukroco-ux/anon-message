const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Lokasi file untuk simpan pesan
const FILE = __dirname + "/messages.json";

// Endpoint: kirim pesan anonim
app.post("/send", (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  let messages = [];
  if (fs.existsSync(FILE)) {
    messages = JSON.parse(fs.readFileSync(FILE));
  }

  messages.push({ text: message, tanggal: new Date().toLocaleString("id-ID") });
  fs.writeFileSync(FILE, JSON.stringify(messages, null, 2));

  res.json({ success: true, message: "Pesan terkirim secara anonim!" });
});

// Endpoint: ambil semua pesan
app.get("/messages", (req, res) => {
  if (!fs.existsSync(FILE)) return res.json([]);
  const messages = JSON.parse(fs.readFileSync(FILE));
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

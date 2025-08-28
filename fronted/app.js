const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const statusEl = document.getElementById("status");
const listEl = document.getElementById("messagesList");

// Kirim pesan ke backend
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();

  if (!message) return;

  const res = await fetch("http://localhost:3000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  if (data.success) {
    statusEl.textContent = "✅ Pesan berhasil dikirim!";
    statusEl.style.color = "green";
    input.value = "";
    loadMessages();
  } else {
    statusEl.textContent = "❌ Gagal mengirim pesan.";
    statusEl.style.color = "red";
  }
});

// Ambil semua pesan
async function loadMessages() {
  const res = await fetch("http://localhost:3000/messages");
  const messages = await res.json();

  listEl.innerHTML = "";
  messages.reverse().forEach(msg => {
    const li = document.createElement("li");
    li.textContent = `${msg.text} (${msg.tanggal})`;
    listEl.appendChild(li);
  });
}

// Load pesan saat pertama kali buka
loadMessages();
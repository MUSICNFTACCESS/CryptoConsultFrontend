document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const userInput = document.getElementById("user-input").value.trim();
  const responseBox = document.getElementById("chat-response");
  responseBox.innerHTML = "Thinking...";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch("https://corsproxy.io/?https://crimznbot.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();
    responseBox.innerHTML = `<strong>CrimznBot:</strong> ${data.reply || "No response."}`;
  } catch (err) {
    console.error(err);
    responseBox.innerHTML = `<span style="color: red;">Error: Failed to fetch</span>`;
  }
});

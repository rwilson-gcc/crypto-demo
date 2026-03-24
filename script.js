// =====================
//   CAESAR CIPHER
// =====================

function caesarEncrypt() {
  const text = document.getElementById("caesar-input").value;
  const shift = parseInt(document.getElementById("shift").value);
  document.getElementById("caesar-output").textContent = caesar(text, shift);
}

function caesarDecrypt() {
  const text = document.getElementById("caesar-input").value;
  const shift = parseInt(document.getElementById("shift").value);
  document.getElementById("caesar-output").textContent = caesar(text, -shift);
}

function caesar(str, shift) {
  return str.replace(/[a-z]/gi, c =>
    String.fromCharCode(
      ((c.toLowerCase().charCodeAt(0) - 97 + shift + 26) % 26) + 97
    )c === c.toUpperCase() ? "toUpperCase" : "toLowerCase"
  );
}

// =====================
//     SHA‑256 HASH
// =====================

function generateHash() {
  const input = document.getElementById("hash-input").value;
  const hash = CryptoJS.SHA256(input).toString();
  document.getElementById("hash-output").textContent = hash;
}

// =====================
//     AES‑256
// =====================

function aesEncrypt() {
  const text = document.getElementById("aes-input").value;
  const key = document.getElementById("aes-key").value;
  if (key.length < 8) return alert("Key must be at least 8 characters.");

  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  document.getElementById("aes-output").textContent = encrypted;
}

function aesDecrypt() {
  const encrypted = document.getElementById("aes-input").value;
  const key = document.getElementById("aes-key").value;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error("Invalid key");
    document.getElementById("aes-output").textContent = decrypted;
  } catch {
    alert("Failed to decrypt — wrong key or ciphertext.");
  }
}

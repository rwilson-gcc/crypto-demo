/* ============================================================
   CAESAR CIPHER
   ============================================================ */

function caesarEncrypt() {
    const text = document.getElementById("caesar-input").value;
    const shift = parseInt(document.getElementById("shift").value);
    const result = caesar(text, shift);
    document.getElementById("caesar-output").textContent = result;
}

function caesarDecrypt() {
    const text = document.getElementById("caesar-input").value;
    const shift = parseInt(document.getElementById("shift").value);
    const result = caesar(text, -shift);
    document.getElementById("caesar-output").textContent = result;
}

function caesar(str, shift) {
    return str.replace(/[a-z]/gi, char => {
        const base = char === char.toUpperCase() ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt() - base + shift + 26) % 26) + base);
    });
}

/* ============================================================
   SHA‑256 HASHING
   ============================================================ */

function generateHash() {
    const text = document.getElementById("hash-input").value;
    const hash = CryptoJS.SHA256(text).toString();
    document.getElementById("hash-output").textContent = hash;
}

/* ============================================================
   AES‑256 ENCRYPTION / DECRYPTION
   ============================================================ */

function aesEncrypt() {
    const text = document.getElementById("aes-input").value;
    const key = document.getElementById("aes-key").value;

    if (key.length < 8) {
        alert("Key must be at least 8 characters long.");
        return;
    }

    try {
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        document.getElementById("aes-output").textContent = encrypted;
    } catch (err) {
        document.getElementById("aes-output").textContent = "Encryption failed.";
    }
}

function aesDecrypt() {
    const encrypted = document.getElementById("aes-input").value;
    const key = document.getElementById("aes-key").value;

    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) throw new Error("Invalid key or ciphertext");
        
        document.getElementById("aes-output").textContent = decrypted;
    } catch (err) {
        document.getElementById("aes-output").textContent = "Decryption failed.";
    }
}

/* ============================================================
   ANIMATION PLACEHOLDERS (empty but defined to prevent errors)
   ============================================================ */

function animateCaesar() {
    const box = document.getElementById("caesar-animation");
    box.innerHTML = "Caesar animation goes here.";
}

function animateSHA() {
    const box = document.getElementById("sha-animation");
    box.innerHTML = "SHA‑256 animation goes here.";
}

function animateAES() {
    const box = document.getElementById("aes-animation");
    box.innerHTML = "AES‑256 animation goes here.";
}
``

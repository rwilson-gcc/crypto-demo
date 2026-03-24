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
   CAESAR SHIFT ANIMATION
   ============================================================ */

function animateCaesar() {
    const box = document.getElementById("caesar-animation");
    box.innerHTML = ""; // reset

    const input = document.getElementById("caesar-input").value || "HELLO";
    const shift = parseInt(document.getElementById("shift").value) || 3;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let html = `
        <h4>Caesar Cipher Shift Animation</h4>
        <p>Each letter shifts by <strong>${shift}</strong> positions:</p>
        <div class="alphabet-row">
            ${alphabet.split("").map(l => `<span>${l}</span>`).join("")}
        </div>
        <div class="alphabet-row shifted">
            ${alphabet.split("").map((l, i) => `<span>${alphabet[(i + shift + 26) % 26]}</span>`).join("")}
        </div>

        <div id="shift-demo"></div>
    `;

    box.innerHTML = html;

    // Animation: show each character transforming
    const demo = document.getElementById("shift-demo");

    let i = 0;
    function step() {
        if (i >= input.length) return;

        const char = input[i].toUpperCase();
        if (!alphabet.includes(char)) {
            demo.innerHTML += `<div class="shift-step">${char} → (unchanged)</div>`;
        } else {
            const oldIndex = alphabet.indexOf(char);
            const newIndex = (oldIndex + shift + 26) % 26;
            const newChar = alphabet[newIndex];

            demo.innerHTML += `
                <div class="shift-step">
                    ${char} → <span class="shifted-letter">${newChar}</span>
                </div>`;
        }

        i++;
        setTimeout(step, 600);
    }

    step();
}

/* ============================================================
   SHA-256 HASHING
   ============================================================ */

function generateHash() {
    const text = document.getElementById("hash-input").value;
    const hash = CryptoJS.SHA256(text).toString();
    document.getElementById("hash-output").textContent = hash;
}

function animateSHA() {
    const box = document.getElementById("sha-animation");
    box.innerHTML = `
        <h4>Avalanche Effect Demonstration</h4>
        <p>A tiny input change results in a very different hash.</p>
        <pre>hello  → ${CryptoJS.SHA256("hello")}</pre>
        <pre>Hello  → ${CryptoJS.SHA256("Hello")}</pre>
    `;
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

    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    document.getElementById("aes-output").textContent = encrypted;
}

function aesDecrypt() {
    const encrypted = document.getElementById("aes-input").value;
    const key = document.getElementById("aes-key").value;

    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) throw new Error();

        document.getElementById("aes-output").textContent = decrypted;
    } catch {
        document.getElementById("aes-output").textContent = "Decryption failed.";
    }
}

function animateAES() {
    const box = document.getElementById("aes-animation");
    box.innerHTML = `
        <h4>AES‑256 Round Visualisation</h4>
        <p>AES applies 14 transformation rounds to the data block:</p>
        <ul class="aes-list">
            <li>1. SubBytes</li>
            <li>2. ShiftRows</li>
            <li>3. MixColumns</li>
            <li>4. AddRoundKey</li>
        </ul>
        <p>This repeats 14 times for AES‑256.</p>
    `;
}

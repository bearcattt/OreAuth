const secretInput = document.getElementById("secret");
const totpDisplay = document.getElementById("totp");
const qrCodeContainer = document.getElementById("qrcode");

document.addEventListener("DOMContentLoaded", () => {
  const savedSecret = localStorage.getItem("authenticator-secret");
  if (savedSecret) {
    secretInput.value = savedSecret;
    generateTOTP();
  }
});

function generateTOTP() {
  const secret = secretInput.value.trim();
  if (!secret) {
    alert("Please enter a secret key.");
    return;
  }

  localStorage.setItem("authenticator-secret", secret);
  const totp = otplib.authenticator.generate(secret);
  totpDisplay.textContent = totp;
  generateQRCode(secret);
}

function generateQRCode(secret) {
  const uri = otplib.authenticator.keyuri("User", "AuthenticatorApp", secret);
  QRCode.toCanvas(qrCodeContainer, uri, function (error) {
    if (error) console.error(error);
  });
}

function clearStorage() {
  localStorage.removeItem("authenticator-secret");
  secretInput.value = "";
  totpDisplay.textContent = "----";
  qrCodeContainer.innerHTML = "";
}

function editSecret() {
  secretInput.removeAttribute("readonly");
  secretInput.focus();
  secretInput.style.background = "#4c4f5b";
  secretInput.addEventListener("blur", () => {
    secretInput.setAttribute("readonly", true);
    secretInput.style.background = "#2b2f3a";
    generateTOTP();
  });
}

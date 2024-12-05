const secretInput = document.getElementById("secret");
const totpDisplay = document.getElementById("totp");
const qrCodeContainer = document.getElementById("qrcode");

let updateInterval;

document.addEventListener("DOMContentLoaded", () => {
  const savedSecret = localStorage.getItem("authenticator-secret");
  if (savedSecret) {
    secretInput.value = savedSecret;
    startTOTPRefresh();
  }
});

function generateTOTP() {
  const secret = secretInput.value.trim();
  if (!secret) {
    alert("Please enter a secret key.");
    return;
  }

  localStorage.setItem("authenticator-secret", secret);
  generateQRCode(secret);
  startTOTPRefresh();
}

function generateQRCode(secret) {
  const uri = otplib.authenticator.keyuri("User", "AuthenticatorApp", secret);
  QRCode.toCanvas(qrCodeContainer, uri, function (error) {
    if (error) console.error(error);
  });
}

function startTOTPRefresh() {
  if (updateInterval) clearInterval(updateInterval);

  updateTOTP(); 
  updateInterval = setInterval(updateTOTP, 1000); 
}

function updateTOTP() {
  const secret = secretInput.value.trim();
  if (!secret) return;

  const totp = otplib.authenticator.generate(secret);
  const remainingTime = 30 - Math.floor(Date.now() / 1000) % 30;

  totpDisplay.textContent = `${totp} (${remainingTime}s)`;

  if (remainingTime === 0) {
    setTimeout(updateTOTP, 1);
  }
}

function clearStorage() {
  localStorage.removeItem("authenticator-secret");
  secretInput.value = "";
  totpDisplay.textContent = "----";
  qrCodeContainer.innerHTML = "";
  clearInterval(updateInterval);
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

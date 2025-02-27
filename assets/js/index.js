const auth = window.otplib.authenticator;
const addButton = document.getElementById("Addbtn");
const container = document.getElementById("container");
auth.options = { step: 30 };

function loadOTPs() {
  container.innerHTML = "";
  const savedOTPs = JSON.parse(localStorage.getItem("otps")) || [];
  savedOTPs.forEach(secret => addOTP(secret));
}

function saveOTPs(secrets) {
  localStorage.setItem("otps", JSON.stringify(secrets));
}

function addOTP(secret) {
  try {
    const otp = auth.generate(secret);
    const otpWrapper = document.createElement("div");
    otpWrapper.classList.add("p-2", "bg-gray-700", "text-white", "rounded", "mb-2", "shadow", "flex", "justify-between", "items-center");
    
    const otpElement = document.createElement("div");
    otpElement.classList.add("p-2", "bg-gray-800", "text-white", "rounded");
    otpElement.textContent = `OTP: ${otp}`;
    

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("ml-2", "p-2", "bg-red-500", "rounded", "hover:bg-red-600");
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", () => {
      otpWrapper.remove();
      const savedOTPs = JSON.parse(localStorage.getItem("otps")) || [];
      const updatedOTPs = savedOTPs.filter(storedSecret => storedSecret !== secret);
      saveOTPs(updatedOTPs);
    });

    otpWrapper.appendChild(otpElement);
    otpWrapper.appendChild(deleteButton);
    container.appendChild(otpWrapper);
    
    const savedOTPs = JSON.parse(localStorage.getItem("otps")) || [];
    if (!savedOTPs.includes(secret)) {
      savedOTPs.push(secret);
      saveOTPs(savedOTPs);
    }
  } catch (error) {
    alert("Failed to generate OTP. Please check the OTP code.");
    console.error("Error generating the OTP:", error);
  }
}

addButton.addEventListener("click", () => {
  const secret = prompt("Enter your secret key: ");
  if (secret) {
    addOTP(secret);
  } else {
    alert("OTP code is required to generate a OTP.");
  }
});

loadOTPs();

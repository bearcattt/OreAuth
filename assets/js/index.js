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
    otpWrapper.classList.add("p-2", "bg-gray-700", "text-white", "rounded", "mb-2", "shadow", "flex", "justify-between", "items-center", "transition-all", "duration-500", "opacity-0");
    
    setTimeout(() => {
      otpWrapper.classList.remove("opacity-0");
      otpWrapper.classList.add("opacity-100");
    }, 50);
    
    const otpElement = document.createElement("div");
    otpElement.classList.add("p-2", "bg-gray-800", "text-white", "rounded", "font-mono", "text-lg");
    otpElement.textContent = `OTP: ${otp}`;
    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("ml-2", "p-2", "bg-red-500", "rounded", "hover:bg-red-600", "transition-all", "duration-200");
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", () => {
      otpWrapper.classList.add("opacity-0", "scale-90");
      setTimeout(() => {
        otpWrapper.remove();
        const savedOTPs = JSON.parse(localStorage.getItem("otps")) || [];
        const updatedOTPs = savedOTPs.filter(storedSecret => storedSecret !== secret);
        saveOTPs(updatedOTPs);
      }, 300);
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

setInterval(() => {
  loadOTPs();
}, 30000);

loadOTPs();

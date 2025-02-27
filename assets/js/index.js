const auth = window.otplib.authenticator;
const addButton = document.getElementById("Addbtn");
const container = document.getElementById("container");
auth.options = { step: 30 };

addButton.addEventListener("click", () => {
  const secret = prompt("Enter your secret key: ");
  if (secret) {
    try {
      const otp = auth.generate(secret);
      
      const otpContainer = document.createElement("div");
      otpContainer.classList.add("p-2", "bg-gray-800", "text-white", "rounded", "mb-2", "shadow");
      otpContainer.textContent = `OTP: ${otp}`;

      container.appendChild(otpContainer);
    } catch (error) {
      alert("Failed to generate OTP. Please check the OTP code.");
      console.error("Error generating the OTP:", error);
    }
  } else {
    alert("OTP code is required to generate a OTP.");
  }
});

const auth = window.otplib.authenticator;
auth.options = { step: 30 };
const addButton = document.getElementById("Addbtn");

addButton.addEventListener("click", () => {
  const secret = prompt("Enter your secret key:");

  if (secret) {
    try {
      const otp = auth.generate(secret);
      alert(`Your OTP is: ${otp}`);
    } catch (error) {
      console.error("Error generating OTP:", error);
      alert("Failed to generate OTP. Please check the secret key.");
    }
  } else {
    alert("Secret key is required to generate OTP.");
  }
});

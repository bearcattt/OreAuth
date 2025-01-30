const auth = window.otplib.authenticator;
const addButton = document.getElementById("Addbtn");
auth.options = { step: 30 };

addButton.addEventListener("click", () => {
  const secret = prompt("Enter your secret key: ");
  if (secret) {
    try {
      const otp = auth.generate(secret);
      alert(`Your 2fa code is: ${otp}`);
    } catch (error) {
      throw new Error("Error generating the OTP: " + error);
      alert("Failed to generate OTP. Please check the otp code.");
    }
  } else {
    alert("otp code is required to generate a OTP.");
  }
});

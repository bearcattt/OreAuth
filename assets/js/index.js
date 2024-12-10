 const auth = window.otplib.authenticator;
    const add = document.getElementById("add");
    auth.options = { step: 30 };

 add.addEventListener("click", function() {
  const secret = prompt("Please enter your verification code here.")
  const token = auth.generate(secret);

  localStorage.setItem("secret", secret)
}); 
     

 

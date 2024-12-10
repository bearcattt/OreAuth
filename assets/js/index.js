 const auth = window.otplib.authenticator;
    const add = document.getElementById("add");
    auth.options = { step: 30 };

 add.addEventListener("click", function() {
  const secret = prompt("Please enter your verification code here.")
  const token = auth.generate(secret);
   const validate = auth.verify({ token, secret });
   if (validate) {
     
   } else {
     alert("invalid verification code")
   }
}); 
     

 

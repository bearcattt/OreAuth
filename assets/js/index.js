 const auth = window.otplib.authenticator;
    const add = document.getElementById("add");
    const container = document.getElementById("auth-container");
    const secret = prompt("secret test")
    auth.options = { step: 30 };
    alert(auth.generate(secret));

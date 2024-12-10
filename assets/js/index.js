 const auth = window.otplib.authenticator;
const add = document.getElementById("add");
auth.options = { step: 30 };

add.addEventListener("click", function () {
    const secret = prompt("Please enter your 2FA code here.");
    if (secret) {
        let secrets = JSON.parse(localStorage.getItem("2FA-Token")) || [];
        const token = auth.generate(secret);
        secrets.push({ secret, token });

        
        localStorage.setItem("2FA-Token", JSON.stringify(secrets));
        console.log("2FA code was added successfully!");
    } else {
        console.log("No 2FA code entered.");
    }
});

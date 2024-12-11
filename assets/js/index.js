 const auth = window.otplib.authenticator;
const add = document.getElementById("add");
const container = document.getElementById("auth-container");

auth.options = { step: 30 };

let username = prompt("Please enter your username:");
function loadCodes() {
    let userCodes = JSON.parse(localStorage.getItem(username)) || [];
    userCodes.forEach(({ secret, token }) => {
        const card = document.createElement("div");
        card.classList.add("bg-gray-100", "rounded-lg", "p-4", "w-64", "shadow-lg", "hover:scale-105", "transition-transform", "duration-200");
        
        const usernameElement = document.createElement("h3");
        usernameElement.classList.add("text-lg", "font-semibold", "text-gray-800", "mb-2");
        usernameElement.textContent = `Username: ${username}`;
        card.appendChild(usernameElement);

        const tokenElement = document.createElement("p");
        tokenElement.classList.add("text-gray-700", "text-sm", "font-medium");
        tokenElement.textContent = `Token: ${token}`;
        card.appendChild(tokenElement);
        
        container.appendChild(card);
    });
}

function refreshTokens() {
    let userCodes = JSON.parse(localStorage.getItem(username)) || [];
    userCodes = userCodes.map(({ secret }) => {
        const token = auth.generate(secret);
        return { secret, token };
    });

    localStorage.setItem(username, JSON.stringify(userCodes));

    // Refresh the container to display updated tokens
    container.innerHTML = '';
    userCodes.forEach(({ token }) => {
        const card = document.createElement("div");
        card.classList.add("bg-gray-100", "rounded-lg", "p-4", "w-64", "shadow-lg", "hover:scale-105", "transition-transform", "duration-200");

        const usernameElement = document.createElement("h3");
        usernameElement.classList.add("text-lg", "font-semibold", "text-gray-800", "mb-2");
        usernameElement.textContent = `Username: ${username}`;
        card.appendChild(usernameElement);

        const tokenElement = document.createElement("p");
        tokenElement.classList.add("text-gray-700", "text-sm", "font-medium");
        tokenElement.textContent = `Token: ${token}`;
        card.appendChild(tokenElement);

        container.appendChild(card);
    });
}

add.addEventListener("click", function () {
    const secret = prompt("Please enter your 2FA secret here.");
    if (secret) {
        let userCodes = JSON.parse(localStorage.getItem(username)) || [];
        const token = auth.generate(secret);
        userCodes.push({ secret, token });
        localStorage.setItem(username, JSON.stringify(userCodes));
        
        const card = document.createElement("div");
        card.classList.add("bg-gray-100", "rounded-lg", "p-4", "w-64", "shadow-lg", "hover:scale-105", "transition-transform", "duration-200");
        
        const usernameElement = document.createElement("h3");
        usernameElement.classList.add("text-lg", "font-semibold", "text-gray-800", "mb-2");
        usernameElement.textContent = `Username: ${username}`;
        card.appendChild(usernameElement);

        const tokenElement = document.createElement("p");
        tokenElement.classList.add("text-gray-700", "text-sm", "font-medium");
        tokenElement.textContent = `Token: ${token}`;
        card.appendChild(tokenElement);
        
        container.appendChild(card);
    }
});
loadCodes();
setInterval(refreshTokens, 30000);

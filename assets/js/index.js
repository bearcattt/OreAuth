 const auth = window.otplib.authenticator;
    const add = document.getElementById("add");
    const container = document.getElementById("auth-container");

    auth.options = { step: 30 };

    function loadCodes() {
        let userCodes = JSON.parse(localStorage.getItem("2FA-Token")) || [];
        userCodes.forEach(({ nickname, token }) => {
            const card = document.createElement("div");
            card.classList.add("bg-white", "rounded-lg", "p-6", "shadow-lg", "hover:scale-105", "transition-transform", "duration-300", "relative");

            const nicknameElement = document.createElement("h3");
            nicknameElement.classList.add("text-lg", "font-semibold", "text-gray-900", "mb-3");
            nicknameElement.textContent = `Nickname: ${nickname}`;
            card.appendChild(nicknameElement);

            const tokenElement = document.createElement("p");
            tokenElement.classList.add("text-xl", "font-medium", "text-indigo-600", "text-center", "transition-all", "duration-500");
            tokenElement.textContent = `Token: ${token}`;
            tokenElement.setAttribute('id', `token-${nickname}`);
            card.appendChild(tokenElement);

            container.appendChild(card);
        });
    }

    function refreshTokens() {
        let userCodes = JSON.parse(localStorage.getItem("2FA-Token")) || [];
        userCodes.forEach(({ nickname, secret }) => {
            const token = auth.generate(secret);
            const tokenElement = document.getElementById(`token-${nickname}`);
            if (tokenElement) {
                tokenElement.classList.add("opacity-0");
                setTimeout(() => {
                    tokenElement.textContent = `Token: ${token}`;
                    tokenElement.classList.remove("opacity-0");
                }, 500);
            }
        });
        localStorage.setItem("2FA-Token", JSON.stringify(userCodes));
    }

    add.addEventListener("click", function () {
        const nickname = prompt("Please enter your nickname for the 2FA code:");
        const secret = prompt("Please enter your 2FA secret here.");
        if (nickname && secret) {
            let userCodes = JSON.parse(localStorage.getItem("2FA-Token")) || [];
            const token = auth.generate(secret);
            userCodes.push({ nickname, secret, token });
            localStorage.setItem("2FA-Token", JSON.stringify(userCodes));

            const card = document.createElement("div");
            card.classList.add("bg-white", "rounded-lg", "p-6", "shadow-lg", "hover:scale-105", "transition-transform", "duration-300", "relative");

            const nicknameElement = document.createElement("h3");
            nicknameElement.classList.add("text-lg", "font-semibold", "text-gray-900", "mb-3");
            nicknameElement.textContent = `Nickname: ${nickname}`;
            card.appendChild(nicknameElement);

            const tokenElement = document.createElement("p");
            tokenElement.classList.add("text-xl", "font-medium", "text-indigo-600", "text-center", "transition-all", "duration-500");
            tokenElement.textContent = `Token: ${token}`;
            tokenElement.setAttribute('id', `token-${nickname}`);
            card.appendChild(tokenElement);

            container.appendChild(card);
        }
    });

    loadCodes();
    setInterval(refreshTokens, 30000);

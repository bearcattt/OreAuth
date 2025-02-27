const auth = window.otplib.authenticator;
const addButton = document.getElementById("Addbtn");
const container = document.getElementById("container");

auth.options = { step: 30 };

function getTimeLeft() {
  return auth.options.step - (Math.floor(Date.now() / 1000) % auth.options.step);
}

function updateCountdowns() {
  document.querySelectorAll(".otp-time").forEach(span => {
    span.textContent = `Refreshing in ${getTimeLeft()}s`;
  });
}

setInterval(updateCountdowns, 1000);

function loadOTPs() {
  container.innerHTML = "";
  const savedOTPs = JSON.parse(localStorage.getItem("otps")) || [];

  savedOTPs.forEach(secret => {
    const otpWrapper = document.createElement("div");
    otpWrapper.classList.add(
      "p-4", "bg-gray-800", "text-white", "rounded-lg", "mb-3", "shadow-lg",
      "flex", "justify-between", "items-center", "transition-all", "duration-500", "opacity-0", "scale-95"
    );

    setTimeout(() => {
      otpWrapper.classList.remove("opacity-0", "scale-95");
      otpWrapper.classList.add("opacity-100", "scale-100");
    }, 50);

    const otpContent = document.createElement("div");
    otpContent.classList.add("flex", "flex-col", "items-start");

    const otpElement = document.createElement("div");
    otpElement.classList.add("p-3", "bg-gray-700", "rounded", "font-mono", "text-2xl", "tracking-wider", "text-green-400");
    otpElement.textContent = auth.generate(secret);

    const timeLeft = document.createElement("span");
    timeLeft.classList.add("otp-time", "text-sm", "text-gray-400", "mt-1");
    timeLeft.textContent = `Refreshing in ${getTimeLeft()}s`;

    otpContent.appendChild(otpElement);
    otpContent.appendChild(timeLeft);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("ml-3", "p-2", "bg-red-500", "rounded-lg", "hover:bg-red-600", "transition-all", "duration-200");
    deleteButton.innerHTML = '<img src="/assets/img/del.svg" class="w-5 h-5">';
    deleteButton.addEventListener("click", () => {
      otpWrapper.classList.add("opacity-0", "scale-90");
      setTimeout(() => {
        otpWrapper.remove();
        const updatedOTPs = savedOTPs.filter(storedSecret => storedSecret !== secret);
        localStorage.setItem("otps", JSON.stringify(updatedOTPs));
      }, 300);
    });

    otpWrapper.appendChild(otpContent);
    otpWrapper.appendChild(deleteButton);
    container.appendChild(otpWrapper);

    setInterval(() => {
      otpElement.textContent = auth.generate(secret);
    }, auth.options.step * 1000);
  });
}

addButton.addEventListener("click", () => {
  const secret = prompt("Enter your secret key:");
  if (secret) {
    const savedOTPs = JSON.parse(localStorage.getItem("otps")) || [];
    if (!savedOTPs.includes(secret)) {
      savedOTPs.push(secret);
      localStorage.setItem("otps", JSON.stringify(savedOTPs));
      loadOTPs();
    }
  } else {
    alert("OTP code is required to generate an OTP.");
  }
});

setInterval(loadOTPs, 30000);
loadOTPs();

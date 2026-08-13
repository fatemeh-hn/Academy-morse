import { responseLogin } from "../api/auth.js";

const userUsername = document.getElementById("username");
const userPassword = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");


loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = userUsername.value;
    const password = userPassword.value;

    try {
        const res = await responseLogin(username, password);
        console.log(res);

        if (res.status === 200){
            window.location.href = "./dashboard.html";
        }

        if (res.status === 400) {
            loginError.textContent = "Username or password is incorrect.";
            loginError.classList.remove("hidden");
            loginError.style.color = "red";
            return;

        }

    } catch {
        loginError.textContent = "Unable to connect to the server.";

    }
    

});



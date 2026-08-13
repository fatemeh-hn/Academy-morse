import { responseLogin } from "../api/auth.js";

const userUsername = document.getElementById("username");
const userPassword = document.getElementById("password");
const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async () => {
    event.preventDefault();
    const username = userUsername.value;
    const password = userPassword.value;

    const res = await responseLogin(username,password);
    console.log(res);

});



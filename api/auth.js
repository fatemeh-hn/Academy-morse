const loginError = document.getElementById("loginError");
export const responseLogin = async (username, password) => {
    try {
        const response = await fetch("http://localhost:5074/api/auth/login", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ username: username, password: password })
        });

        const data = await response.json();
        return {
            status: response.status,
            data,
        };

    } catch {
        loginError.textContent = "Unable to connect to the server.";

    }



}
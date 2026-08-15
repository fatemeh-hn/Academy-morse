const loginError = document.getElementById("loginError");
export const aboutApi = async () => {
    try {
        const response = await fetch("http://localhost:5074/api/meta", { method: "GET" });
        const data = await response.json();


        return data

    } catch {
        loginError.textContent = "Unable to connect to the server.";

    }

}

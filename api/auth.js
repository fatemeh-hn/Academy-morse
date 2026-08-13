export const responseLogin = async(username , password) => {
    const response = await fetch("http://localhost:5074/api/auth/login", {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({ username: username, password : password })
    });

    const data = await response.json();
    return data
}
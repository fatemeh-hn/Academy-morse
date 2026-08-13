const responseLogin = async() => {
    const response = await fetch("http://localhost:5074/api/auth/login", {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({ username: username, password = password })
    });
    console.log(response); 
}
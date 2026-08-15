import Cookies from "js-cookie";
const dashboardError = document.getElementById("dashboardError");
export const fetchDashboard = async () => {
    try {

        const token = Cookies.get("token");
        if (!token) {
            window.location.href = "/login.html"
        }

        const response = await fetch("http://localhost:5074/api/dashboard", { method: "GET" });
        const data = await response.json();
        return data;



    } catch {
        dashboardError.textContent = "Unable to connect to the server.";

    }


}


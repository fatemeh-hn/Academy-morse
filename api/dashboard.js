const dashboardError = document.getElementById("dashboardError");
export const fetchDashboard = async () => {
    try {
        const response = await fetch("http://localhost:5074/api/dashboard", { method: "GET" });
        const data = await response.json();
        return data;

    } catch {
        dashboardError.textContent = "Unable to connect to the server.";

    }


}


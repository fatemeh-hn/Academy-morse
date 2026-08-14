import "../input.css";
import { fetchDashboard } from "../api/dashboard.js"

console.log("DASHBOARD JS IS RUNNING");

const loadDashboard = async () => {
    const data = await fetchDashboard()
    return data

}

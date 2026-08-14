import { fetchDashboard } from "../api/dashboard.js"


const loadDashboard = async () => {
    const data = await fetchDashboard()
    return data

}

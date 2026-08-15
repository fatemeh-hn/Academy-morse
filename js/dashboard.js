import "../input.css";
import { fetchDashboard } from "../api/dashboard.js"

const dashboardError = document.getElementById("dashboardError");

const totalStudentsCount = document.getElementById("totalStudentsCount");
const activeStudentsCount = document.getElementById("activeStudentsCount");
const graduatedStudentsCount = document.getElementById("graduatedStudentsCount");
const totalCoursesCount = document.getElementById("totalCoursesCount");

const students = document.getElementById("students");
const courses = document.getElementById("courses");
const about = document.getElementById("about");
const logout = document.getElementById("logout");



const loadDashboard = async () => {
    try {
        const data = await fetchDashboard()

        totalStudentsCount.textContent = data.data.totalStudents;
        activeStudentsCount.textContent = data.data.activeStudents;
        graduatedStudentsCount.textContent = data.data.graduatedStudents;
        totalCoursesCount.textContent = data.data.totalCourses;
    } catch {
        dashboardError.textContent = "Unable to connect to the server.";
    }



}
await loadDashboard();



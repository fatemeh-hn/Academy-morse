import "../input.css";
import { fetchDashboard } from "../api/dashboard.js"


const totalStudentsCount = document.getElementById("totalStudentsCount");
const activeStudentsCount = document.getElementById("activeStudentsCount");
const graduatedStudentsCount = document.getElementById("graduatedStudentsCount");
const totalCoursesCount = document.getElementById("totalCoursesCount");


const loadDashboard = async () => {
    const data = await fetchDashboard()

    totalStudentsCount.textContent = data.data.totalStudents;
    activeStudentsCount.textContent = data.data.activeStudents;
    graduatedStudentsCount.textContent = data.data.graduatedStudents;
    totalCoursesCount.textContent = data.data.totalCourses;




}
 await loadDashboard()


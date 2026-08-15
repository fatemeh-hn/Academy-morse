const sidebar = document.getElementById("sidebar");

const response = await fetch("../components/sidebar.html");

const html = await response.text();

sidebar.innerHTML = html;


const students = document.getElementById("students");
const courses = document.getElementById("courses");
const about = document.getElementById("about");
const logout = document.getElementById("logout");

students?.addEventListener("click", () => {
    window.location.href = "./students.html";
});

courses?.addEventListener("click", () => {
    window.location.href = "./courses.html";
});

about?.addEventListener("click", () => {
    window.location.href = "./about.html";
});

logout?.addEventListener("click", () => {
    window.location.href = "./login.html";
});
import "../input.css"
import { fetchCourses, fetchCoursesId } from "../api/courses";

const coursesTableBody = document.getElementById("coursesTableBody");

const renderCourses = async () => {
  try {
    const response = await fetchCourses();
    console.log(response);

    const courses = response.data;

    coursesTableBody.innerHTML = "";

    courses.forEach((course) => {
      coursesTableBody.innerHTML += `
        <tr class="hover:bg-slate-100 cursor-pointer"
                     data-course-id="${course.id}">
          <td class="px-4 py-4">
            ${course.id}
          </td>

          <td class="px-4 py-4">
            ${course.title}
          </td>

          <td class="px-4 py-4 text-center">
          ${course.isActive
          ? '<span class="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Active</span>'
          : '<span class="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">Inactive</span>'
        }
          </td>

          <td class="px-4 py-4 text-center">
            
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.log(error);
  }
};
await renderCourses()



//render datail modal

const courseDetailModal = document.getElementById("courseDetailModal");
const closeCourseDetailModal = document.getElementById("closeCourseDetailModal");
const detailId = document.getElementById("detailId");
const detailTitle = document.getElementById("detailTitle");
const detailTeacher = document.getElementById("detailTeacher");
const detailPrice = document.getElementById("detailPrice");
const detailCapacity = document.getElementById("detailCapacity");
const detailDuration = document.getElementById("detailDuration");
const detailStatus = document.getElementById("detailStatus");

coursesTableBody.addEventListener("click", async (event) => {

  const row = event.target.closest("tr");

  if (!row) return;

  const id = row.dataset.courseId;

  try {

    const response = await fetchCoursesId(id);

    const course = response.data;

    detailId.textContent = course.id;
    detailTitle.textContent = course.title;
    detailTeacher.textContent = course.teacher;
    detailPrice.textContent = course.price;
    detailCapacity.textContent = course.capacity;
    detailDuration.textContent = course.duration;

    detailStatus.textContent =
      course.isActive ? "Active" : "Inactive";

    detailStatus.className = course.isActive
      ? "px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700"
      : "px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700";

    courseDetailModal.classList.remove("hidden");

  } catch (error) {

    console.log(error);

  }

});

closeCourseDetailModal.addEventListener("click", () => {
  courseDetailModal.classList.add("hidden");
});








































// import { editCourses} from "../api/courses.js";
// import { deleteCourses } from "../api/courses.js";

// const courseData = {
//   title: "JavaScript",
//   price: 500000,
//   capacity: 20,
//   teacher: "Ali",
//   duration: 30,
//   isActive: true,
// };

// const result = await editCourses(4, courseData);;

// console.log(result);

// const addCourseButton = document.getElementById("addCourseButton");
// const addCourseModal = document.getElementById("addCourseModal");

// addCourseButton.addEventListener("click", () => {
//   addCourseModal.classList.remove("hidden");
// });

// const result = await deleteCourses(4);

// if (result.status === 200) {
//   console.log(result.data.message);
// } else if (result.status === 400) {
//   console.log(result.data.message);
// } else if (result.status === 404) {
//   console.log(result.data.message);
// }
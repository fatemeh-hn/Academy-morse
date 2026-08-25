import "../input.css"
import { fetchCourses, fetchCoursesId, createRequest, deleteCourses, editCourses } from "../api/courses";

const coursesTableBody = document.getElementById("coursesTableBody");


//render all courses
const renderCourses = async () => {
  try {
    const response = await fetchCourses();
    console.log(response);

    const courses = response.data;

    coursesTableBody.innerHTML = "";

    courses.forEach((course) => { coursesTableBody.innerHTML += `
        <tr>
          <td class="px-4 py-4">
            ${course.id}
          </td>

          <td class="px-4 py-4">
            ${course.title}
          </td>

          <td class="px-4 py-4">
          <button
          type="button"
          class="details-course px-4 py-2 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105
          transition-transform duration-200"
          data-id="${course.id}"
          >
          details
          </button>
          </td>

          <td class="px-4 py-4 text-center">
          ${course.isActive
          ? '<span class="px-3 py-1 text-xs font-medium rounded-full  text-green-600">Active</span>'
          : '<span class="px-3 py-1 text-xs font-medium rounded-full  text-red-600">Inactive</span>'
        }
          </td>

          <td class="px-4 py-4 text-center">
          <div class="flex items-center justify-center gap-2">

          <button
          type="button"
          class="edit-course px-4 py-2 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:scale-105
         transition-transform duration-200"
          data-id="${course.id}"
          >
          Edit
          </button>

          <button
          type="button"
          class="delete-course px-4 py-2 text-xs font-medium rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:scale-105
         transition-transform duration-200"
          data-id="${course.id}"
          >
          Delete
          </button>

         </div>
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

  const detailsButton = event.target.closest(".details-course");

  if (!detailsButton) return;

  const id = detailsButton.dataset.id;

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



//render add course modal
const addCourseButton = document.getElementById("addCourseButton");
const addCourseModal = document.getElementById("addCourseModal");
const closeAddCourseModal = document.getElementById("closeAddCourseModal");
const cancelAddCourse = document.getElementById("cancelAddCourse");

addCourseButton.addEventListener("click", () => {
  addCourseModal.classList.remove("hidden");
});

closeAddCourseModal.addEventListener("click", () => {
  addCourseModal.classList.add("hidden");
});

cancelAddCourse.addEventListener("click", () => {
  addCourseModal.classList.add("hidden");
});

const addCourseForm = document.getElementById("addCourseForm");
const title = document.getElementById("addTitle");
const price = document.getElementById("addPrice");
const capacity = document.getElementById("addCapacity");
const teacher = document.getElementById("addTeacher");
const duration = document.getElementById("addDuration");
const isActive = document.getElementById("addIsActive");


addCourseForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const courseData = {
    title: title.value,
    price: Number(price.value),
    capacity: Number(capacity.value),
    teacher: teacher.value,
    duration: Number(duration.value),
    isActive: isActive.checked,
  };

  try {
    const response = await createRequest(courseData);

    if (response.status === 201) {
      addCourseModal.classList.add("hidden");
      addCourseForm.reset();
      await renderCourses();
    } else if (response.status === 400) {

      console.log(response.data.message);
    }

  } catch (error) {
    console.log(error);
  }
});


//render delete modal
const deleteCourseModal = document.getElementById("deleteCourseModal");
const cancelDeleteCourse = document.getElementById("cancelDeleteCourse");
const confirmDeleteCourse = document.getElementById("confirmDeleteCourse");

const deleteCourseTitle = document.getElementById("deleteCourseTitle");
const deleteCourseError = document.getElementById("deleteCourseError");

let selectedCourseId = null;

coursesTableBody.addEventListener("click", async (event) => {

  const deleteButton = event.target.closest(".delete-course");

  if (!deleteButton) return;

  const id = deleteButton.dataset.id;

  selectedCourseId = id;

  const response = await fetchCoursesId(id);
  const course = response.data;

  deleteCourseTitle.textContent = course.title;

  deleteCourseError.classList.add("hidden");

  deleteCourseModal.classList.remove("hidden");
});

cancelDeleteCourse.addEventListener("click", () => {
  deleteCourseModal.classList.add("hidden");

  selectedCourseId = null;
});

confirmDeleteCourse.addEventListener("click", async () => {

  if (!selectedCourseId) return;

  try {

    const response = await deleteCourses(selectedCourseId);

    if (response.status === 200) {

      deleteCourseModal.classList.add("hidden");

      selectedCourseId = null;

      await renderCourses();

    } else if (response.status === 400) {

      deleteCourseError.textContent = response.data.message;
      deleteCourseError.classList.remove("hidden");

    } else if (response.status === 404) {

      deleteCourseError.textContent = response.data.message;
      deleteCourseError.classList.remove("hidden");

    }

  } catch (error) {

    console.log(error);

    deleteCourseError.textContent = "Unable to connect to the server.";
    deleteCourseError.classList.remove("hidden");

  }
});



//render edit modal

const editCourseModal = document.getElementById("editCourseModal");
const closeEditCourseModal = document.getElementById("closeEditCourseModal");
const cancelEditCourse = document.getElementById("cancelEditCourse");
const editCourseForm = document.getElementById("editCourseForm");

const editCourseId = document.getElementById("editCourseId");
const editTitle = document.getElementById("editTitle");
const editPrice = document.getElementById("editPrice");
const editCapacity = document.getElementById("editCapacity");
const editTeacher = document.getElementById("editTeacher");
const editDuration = document.getElementById("editDuration");
const editIsActive = document.getElementById("editIsActive");

let selectedEditCourseId = null;

coursesTableBody.addEventListener("click", async (event) => {

  const editButton = event.target.closest(".edit-course");

  if (!editButton) return;

  const id = editButton.dataset.id;

  selectedEditCourseId = id;

  try {

    const response = await fetchCoursesId(id);

    const course = response.data;

    editCourseId.value = course.id;
    editTitle.value = course.title;
    editPrice.value = course.price;
    editCapacity.value = course.capacity;
    editTeacher.value = course.teacher;
    editDuration.value = course.duration;
    editIsActive.checked = course.isActive;

    editCourseModal.classList.remove("hidden");

  } catch (error) {

    console.log(error);

  }

});


// close modal with ex
closeEditCourseModal.addEventListener("click", () => {

  editCourseModal.classList.add("hidden");

  selectedEditCourseId = null;

});


// close modal with button
cancelEditCourse.addEventListener("click", () => {

  editCourseModal.classList.add("hidden");

  selectedEditCourseId = null;

});


// post datails
editCourseForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  if (!selectedEditCourseId) return;

  const courseData = {

    title: editTitle.value,
    price: Number(editPrice.value),
    capacity: Number(editCapacity.value),
    teacher: editTeacher.value,
    duration: Number(editDuration.value),
    isActive: editIsActive.checked,

  };

  try {

    const response = await editCourses(selectedEditCourseId, courseData );

    if (response.status === 200) {

      editCourseModal.classList.add("hidden");

      selectedEditCourseId = null;

      await renderCourses();

    } else if (response.status === 400) {

      console.log(response.data.message);

    } else if (response.status === 404) {

      console.log(response.data.message);

    }

  } catch (error) {

    console.log(error);

  }

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
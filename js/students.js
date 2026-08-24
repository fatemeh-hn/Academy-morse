import "../input.css"
import { fetchStudents, createStudents, fetchStudentsId, editStudents, deleteStudents } from "../api/students"

const studentsTableBody = document.getElementById("studentsTableBody");




//render all Students


const statusBadge = (status) => {
    if (status === "Active") {
        return `<span class="text-green-600">Active</span>`;
    }

    if (status === "Inactive") {
        return `<span class="text-red-600">Inactive</span>`;
    }

    if (status === "Graduated") {
        return `<span class="text-yellow-600">Graduated</span>`;
    }

    return `<span class="text-gray-600">Unknown</span>`;
};


const renderStudents = async () => {
    try {
        const response = await fetchStudents();

        const students = response.data.items;

        studentsTableBody.innerHTML = "";

        students.forEach((student) => {
            studentsTableBody.innerHTML += `
        <tr>
          <td class="px-4 py-4">
            ${student.id}
          </td>

          <td class="px-4 py-4">
            ${student.firstName}
          </td>

          <td class="px-4 py-4">
            ${student.lastName}
          </td>

          <td class="px-4 py-4">
            ${student.courseTitle}
          </td>

          <td class="px-4 py-4">
           ${statusBadge(student.statusName)}
        
          </td>
        


          <td class="px-4 py-4">
          <button
          type="button"
          class="details-students px-4 py-2 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105
          transition-transform duration-200"
          data-id="${student.id}"
          >
          details
          </button>
          </td>

          
          <td class="px-4 py-4 text-center">
          <div class="flex items-center justify-center gap-2">

          <button
          type="button"
          class="edit-course px-4 py-2 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:scale-105
          transition-transform duration-200"
          data-id="${student.id}"
          >
          Edit
          </button>

          <button
          type="button"
          class="delete-course px-4 py-2 text-xs font-medium rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:scale-105
          transition-transform duration-200"
          data-id="${student.id}"
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
await renderStudents()



//render datail modal

const studentsDetailModal = document.getElementById("studentsDetailModal");
const closeStudentsDetailModal = document.getElementById("closeStudentsDetailModal");
const detailId = document.getElementById("detailId");
const detailFirstName = document.getElementById("detailFirstName");
const detailLastName = document.getElementById("detailLastName");
const detailAge = document.getElementById("detailAge");
const detailPhone = document.getElementById("detailPhone");
const detailEmail = document.getElementById("detailEmail");
const detailCourseId = document.getElementById("detailCourseId");
const detailCourseTitle = document.getElementById("detailCourseTitle");
const detailStatus = document.getElementById("detailStatus");




studentsTableBody.addEventListener("click", async (event) => {

    const detailsButton = event.target.closest(".details-students");

    if (!detailsButton) return;

    const id = detailsButton.dataset.id;

    try {

        const response = await fetchStudentsId(id);

        const students = response.data;

        detailId.textContent = students.id;
        detailFirstName.textContent = students.firstName;
        detailLastName.textContent = students.lastName;
        detailAge.textContent = students.age;
        detailPhone.textContent = students.phone;
        detailEmail.textContent = students.email;
        detailCourseId.textContent = students.courseId;
        detailCourseTitle.textContent = students.courseTitle;
        detailStatus.textContent = students.status;



        if (students.statusName === "Active") {
            detailStatus.textContent = "Active";

            detailStatus.className =
                "px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700";

        } else if (students.statusName === "Inactive") {
            detailStatus.textContent = "Inactive";

            detailStatus.className =
                "px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700";

        } else if (students.statusName === "Graduated") {
            detailStatus.textContent = "Graduated";

            detailStatus.className =
                "px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700";

        }

        studentsDetailModal.classList.remove("hidden");

    } catch (error) {

        console.log(error);

    }

});

closeStudentsDetailModal.addEventListener("click", () => {
    studentsDetailModal.classList.add("hidden");
});



//render add students modal
const addStudentsButton = document.getElementById("addStudentsButton");
const addStudentsModal = document.getElementById("addStudentsModal");
const closeAddStudentsModal = document.getElementById("closeAddStudentsModal");
const cancelAddStudents = document.getElementById("cancelAddStudents");

addStudentsButton.addEventListener("click", () => {
  addStudentsModal.classList.remove("hidden");
});

closeAddStudentsModal.addEventListener("click", () => {
  addStudentsModal.classList.add("hidden");
});

cancelAddStudents.addEventListener("click", () => {
  addStudentsModal.classList.add("hidden");
});

const addStudentsForm = document.getElementById("addStudentsForm");
const addFirstName = document.getElementById("addFirstName");
const addLastName = document.getElementById("addLastName");
const addAge = document.getElementById("addAge");
const addPhone = document.getElementById("addPhone");
const addEmail = document.getElementById("addEmail");
const addCourseId = document.getElementById("addCourseId");
const addCourseTitle = document.getElementById("addCourseTitle");
const addStatus = document.getElementById("addStatus");


addStudentsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("submit clicked");

  const studentsData = {
    firstName: addFirstName.value,
    lastName: addLastName.value,
    age: Number(addAge.value),
    phone: addPhone.value,
    email: addEmail.value,
    courseId: Number(addCourseId.value),
    courseTitle: addCourseTitle.value,
    status: Number(addStatus.value),
  
};

  try {
    const response = await createStudents(studentsData);

    if (response.status === 201) {
      addStudentsModal.classList.add("hidden");
      addStudentsForm.reset();
      await renderStudents();
    } else if (response.status === 400) {

      console.log(response.data.message);
    }

  } catch (error) {
    console.log(error);
  }
});

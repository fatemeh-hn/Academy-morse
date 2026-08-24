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

        </tr>
      `;
        });

    } catch (error) {
        console.log(error);
    }
};
await renderStudents()


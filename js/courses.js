import { editCourses} from "../api/courses.js";
import { deleteCourses } from "../api/courses.js";

const courseData = {
  title: "JavaScript",
  price: 500000,
  capacity: 20,
  teacher: "Ali",
  duration: 30,
  isActive: true,
};

const result = await editCourses(4, courseData);;

console.log(result);



const result = await deleteCourses(4);

if (result.status === 200) {
  console.log(result.data.message);
} else if (result.status === 400) {
  console.log(result.data.message);
} else if (result.status === 404) {
  console.log(result.data.message);
}
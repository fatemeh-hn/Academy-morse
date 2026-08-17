import { createRequest } from "../api/courses.js";

const courseData = {
  title: "JavaScript",
  price: 500000,
  capacity: 20,
  teacher: "Ali",
  duration: 30,
  isActive: true,
};

const result = await createRequest(courseData);

console.log(result);
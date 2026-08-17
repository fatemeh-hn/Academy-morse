const coursesError = document.getElementById("coursesError");
export const fetchCourses = async () => {
    try {
        const response = await fetch("http://localhost:5074/api/courses"
            , { method: "GET" });
        const data = await response.json();
        return data

    } catch {
        coursesError.textContent = "Unable to connect to the server.";

    }
}


export const createRequest = async (courseData) => {
    try {
        const response = await fetch("http://localhost:5074/api/courses", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(courseData),

        });

        const data = await response.json();
        if (response.status === 400) {
            coursesError.textContent = "Bad Request";
        }

        return {
  status: response.status,
  data,
};

    } catch {
        coursesError.textContent = "Unable to connect to the server.";

    }



}



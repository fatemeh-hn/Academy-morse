const studentsError = document.getElementById("studentsError");

export const fetchStudents = async () => {
    try {
        const response = await fetch("http://localhost:5074/api/students?page=1&pageSize=10&sort=name"
            , { method: "GET" });
        const data = await response.json();
        
        return data

    } catch {
        studentsError.textContent = "Unable to connect to the server.";

    }
}
await fetchStudents()



export const createStudents = async (studentsData) => {
    try {
        const response = await fetch("http://localhost:5074/api/students", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(studentsData),

        });

        const data = await response.json();

        return {
            status: response.status,
            data,
        };

    } catch {
        studentsError.textContent = "Unable to connect to the server.";

    }
}




export const fetchStudentsId = async (id) => {
    try {
        const response = await fetch(`http://localhost:5074/api/students/${id}`
            , { method: "GET" });
        const data = await response.json();
        return data

    } catch {
        studentsError.textContent = "Unable to connect to the server.";

    }
}


export const editStudents = async (id , studentsData)  => {
    try {
        const response = await fetch(`http://localhost:5074/api/students/${id}`, {
            method: "PUT", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(studentsData),

        });

        const data = await response.json();
        if (response.status === 400) {
            studentsError.textContent = "Bad Request";
        } else if (response.status === 404) {
            studentsError.textContent = "Not Found";
        }

        return {
            status: response.status,
            data,
        };

    } catch {
        studentsError.textContent = "Unable to connect to the server.";

    }
}


export const deleteStudents = async (id) => {
  try {
    const response = await fetch(`http://localhost:5074/api/students/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    return {
      status: response.status,
      data,
    };

  } catch {
    studentsError.textContent = "Unable to connect to the server.";
  }
};






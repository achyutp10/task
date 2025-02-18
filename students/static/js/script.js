document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "/api/students/";

    function fetchStudents() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById("students-list");
                tableBody.innerHTML = "";
                data.forEach(student => {
                    const row = `<tr>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.address}</td>
                        <td>${student.grade}</td>
                        <td>${student.major}</td>
                        <td>
                            <button onclick="editStudent(${student.id}, '${student.name}', ${student.age}, '${student.address}', '${student.grade}', '${student.major}')">Edit</button>
                            <button onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            });
    }

    document.getElementById("student-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const studentId = document.getElementById("student-id").value;
        const studentData = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            address: document.getElementById("address").value,
            grade: document.getElementById("grade").value,
            major: document.getElementById("major").value
        };

        if (studentId) {
            updateStudent(studentId, studentData);
        } else {
            createStudent(studentData);
        }
    });

    function createStudent(studentData) {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(() => {
            fetchStudents();
            resetForm();
        });
    }

    function updateStudent(id, studentData) {
        fetch(apiUrl + id + "/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(() => {
            fetchStudents();
            resetForm();
        });
    }

    function deleteStudent(id) {
        fetch(apiUrl + id + "/", { method: "DELETE" })
        .then(() => fetchStudents());
    }

    window.editStudent = function (id, name, age, address, grade, major) {
        document.getElementById("student-id").value = id;
        document.getElementById("name").value = name;
        document.getElementById("age").value = age;
        document.getElementById("address").value = address;
        document.getElementById("grade").value = grade;
        document.getElementById("major").value = major;
    };

    function resetForm() {
        document.getElementById("student-form").reset();
        document.getElementById("student-id").value = "";
    }

    fetchStudents();
});

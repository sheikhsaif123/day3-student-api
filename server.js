 const express = require("express");

const app = express();

app.use(express.json());

const students = [
    {
        id: 1,
        name: "Saif",
        usn: "4SF25CI149",
        age: 19,
        dob: "2007-04-20",
        course: "Computer Science",
        year: 2,
        hobbies: ["Coding", "Gaming"]
    },
    {
        id: 2,
        name: "Rahul",
        usn: "4SF25172",
        age: 19,
        dob: "2007-05-20",
        course: "AIML",
        year: 2,
        hobbies: ["Cricket", "Music"]
    }
];


// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Day 3 Student API"
    });
});


// GET /students
// View all student records
app.get("/students", (req, res) => {
    res.status(200).json(students);
});


// GET /students/:id
// View a particular student
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});


// POST /students
// Add a new student
app.post("/students", (req, res) => {
    const { name, usn, age, dob, course, year, hobbies } = req.body;

    if (!name || !usn || !age || !dob || !course || !year || !hobbies) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name: name,
        usn: usn,
        age: age,
        dob: dob,
        course: course,
        year: year,
        hobbies: hobbies
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});


// PUT /students/:id
// Update student details
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, usn, age, dob, course, year, hobbies } = req.body;

    if (!name || !usn || !age || !dob || !course || !year || !hobbies) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    student.name = name;
    student.usn = usn;
    student.age = age;
    student.dob = dob;
    student.course = course;
    student.year = year;
    student.hobbies = hobbies;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});


// DELETE /students/:id
// Delete a student record
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
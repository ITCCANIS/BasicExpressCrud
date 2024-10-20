const Joi = require("joi");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

students = [
  { id: 1, name: "John" },
  { id: 2, name: "Doe" },
  { id: 3, name: "Smith" },
];

app.get("/itc", (req, res) => {
  res.send("<h1>ITC</h1>");
});
app.get("/itc/students", (req, res) => {
  res.send(students);
});
app.get("/itc/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student)
    res
      .status(404)
      .send("EROR 404 the student with the given ID was NOT FOUND");
  else {
    res.send(student);
  }
});

app.post("/itc/students", (req, res) => {
  const { error } = validate_input(req.body);
  // if valid return 400 -bad request
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const student = {
    id: students.length + 1,
    name: req.body.name,
  };
  students.push(student);
  res.send(students);
});

app.put("/itc/students/:id", (req, res) => {
  //find the student
  const student = students.find((s) => s.id === parseInt(req.params.id));
  // check if student exists
  if (!student) {
    res.status(404).send("No student with matching ID was found");
    return;
  }
  //validate the input
  const { error } = validate_input(req.body);
  // if valid return 400 -bad request
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //update the student
  student.name = req.body.name;
  //display the new students list
  res.send(students);
});

app.delete("/itc/students/:id", (req, res) => {
  //check if the user with given id exists
  const student = students.find((s) => s.id === parseInt(req.params.id));
  console.log(student);
  //if it doesnt return error

  if (!student) {
    res.status(404).send("No student with the given ID was found");
    return;
  }
  // remove the user if it exists

  i = students.indexOf(student);
  students.splice(i, 1);
  res.status(200).send(students);

  // for (let i = 0; i < students.length; i++) {
  //   if (students[i].id === student.id) {;
  //     let spliced = students.splice(i, 1);
  //     console.log("Removed Element: ", spliced);      <---------- This was the first method i used before replacing with a short one
  //     console.log("Remaining Elements: ", students);
  //     res.status(200).send(students);
  //   }
  // }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function validate_input(student) {
  const schema = {
    name: Joi.string().min(4).required(),
  };

  return Joi.validate(student, schema);
}

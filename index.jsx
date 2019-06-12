const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

app.get("/", (req, res) => {
  res.send("Courses Repository");
});

app.get("/api", (req, res) => {
  res.send("Please specify method");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  let course = courseExistance(req.params, res);
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(`Bad request: ${error.details[0].message}`);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  course = courseExistance(req.params, res);
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(`Bad request: ${error.details[0].message}`);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  //something
});

app.delete("/api/courses/:id", (req, res) => {
  let course = courseExistance(req.params, res);
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate(course, schema);
}

function courseExistance(params, res) {
  let course = courses.find(c => c.id === parseInt(params.id));
  if (!course)
    //404
    return res.status(404).send("Course n ot found");
  return course;
}

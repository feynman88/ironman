const express = require("express");
const router = express.Router();

const courses = [
    { id: 1, name: "math" },
    { id: 2, name: "physics" },
    { id: 3, name: "biology" },
  ];


router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  // error handling and validation
  const { error } = validatCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  // error handling and validation
  const { error } = validatCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // if it doesn't exist return 404
  if (!course) res.status(404).send("this course does not exist ");

  // if invalid return bad request
  if (error) return res.status(400).send(error.details[0].message);

  // update course
  course.name = req.body.name;

  // return the updated course
  res.send(course);
});

router.delete("/:id", (req, res) => {
  // look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // if it doesn't exist, return 404
  if (!course) return res.status(404).send("This course does not exist");

  // delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return the deleted course
  res.send(course);
});



module.exports = router;
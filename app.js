// this is the new commit
// a new commit created by omar
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const express = require("express");
const Joi = require("joi");
const app = express();
const helmet = require("helmet");
app.use(express.json());
const logger = require("./middleware/logger");
app.use(logger);
const morgan = require("morgan");
const courses = require("./Routes/courses");
const home = require("./Routes/home");

app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);
//configration
console.log("app name : " + config.get("name"));
console.log("mail server : " + config.get("mail.host"));
console.log("mail password : " + config.get("mail.password"));
// console.log(`process env : ${process.env.app_password}`)

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(function (req, res, next) {
  console.log("authentication data .....");
  next();
});



function validatCourse(course) {
  // validate
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}



if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled debug .....");
}

//database debug example
dbDebugger("connected to the db");

// PORT
const port = process.env.PORT || 3000;
console.log(`this is the new port ${port}`);
app.listen(port, console.log(`listening on the new port ${port}`));

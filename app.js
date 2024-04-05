const createError = require("http-errors");
const path = require("path");

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const logger = require("morgan");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");

const app = express();

// view engine setup
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "src/views/partials"));

app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "hbs");

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
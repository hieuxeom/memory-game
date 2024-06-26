const createError = require("http-errors");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { loadDb, authentication, isExpired, permit, checkStreak } = require("./src/utils/middleware");

const app = express();

// view engine setup
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "src/views/partials"));

app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "hbs");
app.set("view options", { layout: "/layouts/index" });

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(loadDb);
app.use(authentication);

const homeRouter = require("./src/routes/homeRouter");
const gameRouter = require("./src/routes/gameRouter");
const apiRouter = require("./src/routes/apiRouter");
const inventoryRouter = require("./src/routes/inventoryRouter");
const authRouter = require("./src/routes/authRouter");
const profileRouter = require("./src/routes/profileRouter");
const shopRouter = require("./src/routes/shopRouter");
const adminRouter = require("./src/routes/adminRouter");
const rankRouter = require("./src/routes/rankRouter");

app.use("/", checkStreak(), homeRouter);
app.use("/game", gameRouter);
app.use("/api", apiRouter);
app.use("/inventory", inventoryRouter);
app.use("/auth", authRouter);
app.use("/shop", shopRouter);
app.use("/ranking", rankRouter);
app.use("/profile", isExpired(), profileRouter);
app.use("/admin", permit("admin"), adminRouter);

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

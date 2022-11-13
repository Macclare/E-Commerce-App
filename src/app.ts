import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import methodOverride from "method-override";
const SequelizeStore = require("connect-session-sequelize")(session.Store)


dotenv.config();

import indexRouter from "./routes/index";

const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "..", path.sep, "src/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))
app.use(session({
	secret: <string>process.env.SESSION_SECRET, //INSTANCE OF NODE.JS RUNNING ON MY MACHINE
	resave: true,
	saveUninitialized: true,
}))



app.use("/", indexRouter);
app.use(express.static("public"));

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

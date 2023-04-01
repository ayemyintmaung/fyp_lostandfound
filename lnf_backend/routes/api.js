var express = require("express");
var authRouter = require("./auth");
var userRouter = require("./user");
var foundRouter = require("./found");
var lostRouter = require("./lost");
var adminRouter = require("./admin");
var app = express();

app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use("/lost/", lostRouter);
app.use("/found/", foundRouter);
app.use("/admin/", adminRouter);
module.exports = app;

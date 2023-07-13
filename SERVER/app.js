// app.js
const express = require("express");
const app = express();
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const port = 3000;

app.set("view engine", "ejs");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cookieParser());
app.use(express.static("./files"));
app.use("/cart", express.static("files"));
app.use("/admin", express.static("files"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const session = require("./my_modules/session");
const session = require("express-session");
app.use(
  session({
    secret: "keyboard",
    name: "session",
    keys: ["key1", "key2"],
  })
);

//////
//////new session
const chk = require("./my_modules/chk");
app.use(chk());

/////
/////

/////////////////////////////////////////////

const cartItemsRouter = require("./router/cartItemsRouter");
const cartRouter = require("./router/cartRouter");
const adminRouter = require("./router/adminRouter");
const adminAddRouter = require("./router/adminAddRouter");
const loginRouter = require("./router/loginRouter");
const signupRouter = require("./router/signupRouter");
const changePassRouter = require("./router/changePassRouter");
const forgotPassRouter = require("./router/forgotPassRouter");
const newPassRouter = require("./router/newPassRouter");

const homepageRouter = require("./router/homepageRouter");
const loadMoreRouter = require("./router/loadMoreRouter");
const verifyEmailRouter = require("./router/verifyEmailRouter");
const logoutRouter = require("./router/logoutRouter");
const showDetailRouter = require("./router/showDetailRouter");
const cartAuthRouter = require("./router/cartAuthRouter");
const addCartRouter = require("./router/addCartRouter");
const deleteProductRouter = require("./router/deleteProductRouter");

app.use("/", homepageRouter);
app.use("/loadMore", loadMoreRouter);

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/changePass", changePassRouter);
app.use("/forgotPass", forgotPassRouter);
app.use("/newPass", newPassRouter);

app.use("/verify", verifyEmailRouter);
app.use("/cartItems", cartItemsRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/adminAdd", adminAddRouter);

app.use("/logout", logoutRouter);
app.use("/showDetail", showDetailRouter);
app.use("/cartAuth", cartAuthRouter);
app.use("/addCart", addCartRouter);

app.use("/deleteProduct", deleteProductRouter);

/////////////////////////////////////////////////////////////////////////
////////////////////javaScript and CSS files Here////.....///////////////
/////////////////////////////////////////////////////////////////////////
//scripts

app.get("/login.js", function (req, res) {
  res.sendFile(__dirname + "/public/login/login.js");
});

app.get("/signup.js", function (req, res) {
  res.sendFile(__dirname + "/public/signup/signup.js");
});
app.get("/home.js", function (req, res) {
  res.sendFile(__dirname + "/public/home/home.js");
});
app.get("/cart.js", function (req, res) {
  res.sendFile(__dirname + "/public/cart/cart.js");
});
app.get("/changePass.js", function (req, res) {
  res.sendFile(__dirname + "/public/pass/changePass.js");
});
app.get("/newPass.js", function (req, res) {
  res.sendFile(__dirname + "/public/pass/newPass.js");
});
app.get("/forgot.js", function (req, res) {
  res.sendFile(__dirname + "/public/pass/forgot.js");
});
app.get("/admin.js", function (req, res) {
  res.sendFile(__dirname + "/public/admin/admin.js");
});
app.get("/addProduct.js", function (req, res) {
  res.sendFile(__dirname + "/public/admin/addProduct.js");
});
app.get("/header.js", function (req, res) {
  res.sendFile(__dirname + "/public/header/header.js");
});

//css-stylesheets
app.get("/login.css", function (req, res) {
  res.sendFile(__dirname + "/public/login/login.css");
});

app.get("/signup.css", function (req, res) {
  res.sendFile(__dirname + "/public/signup/signup.css");
});

app.get("/home.css", function (req, res) {
  res.sendFile(__dirname + "/public/home/home.css");
});

app.get("/pass.css", function (req, res) {
  res.sendFile(__dirname + "/public/pass/pass.css");
});
app.get("/cart.css", function (req, res) {
  res.sendFile(__dirname + "/public/cart/cart.css");
});

app.get("/header.css", function (req, res) {
  res.sendFile(__dirname + "/public/header/header.css");
});

app.get("/admin.css", function (req, res) {
  res.sendFile(__dirname + "/public/admin/admin.css");
});

app.get("/addProduct.css", function (req, res) {
  res.sendFile(__dirname + "/public/admin/addproduct.css");
});

//hosting at port
app.listen(port, () => {
  console.log(`app listening at port ${port}`);
  console.log(`http://localhost:${port}`);
});

//initializes
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const DB_URL = "mongodb+srv://favvydon:favvydon@cluster0.huwty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//app
const app = express();

//port
const port = 3300;

//routes
const productRoute = require("./routes/product");
const homeRoute = require("./routes/home");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

//middleware
app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.disable("view cache");

app.use("/", homeRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

//mongoose
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("Connected to Db");
    });
  })
  .catch((err) => {
    console.log(err);
  });

    app.listen(port, ()=>{
      console.log('Connected to Server')
    })
module.exports = app;


const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const methodOverride = require("method-override");
const { data } = require("./data");

const port = 3000;

// override with POST having ?_method=DELETE/PATCH
app.use(methodOverride("_method"));

// // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//setting folder for static assets
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,"public")))

//setting ejs
app.set("view engine", "ejs");
// app.set("views","views")
// app.set("views",path.join(__dirname,"views"))

// Fake Database
let blogs = data;
// https://images.pexels.com/photos/296817/pexels-photo-296817.jpeg?auto=compress&cs=tinysrgb&w=600

// https://images.pexels.com/photos/620335/pexels-photo-620335.jpeg?auto=compress&cs=tinysrgb&w=600

// https://images.pexels.com/photos/620335/pexels-photo-620335.jpeg?auto=compress&cs=tinysrgb&w=600

//home route --> Render home.ejs
app.get("/", (req, res) => {
  // console.log(uuidv4());
  res.render("home");
});

//display all blogs
app.get("/blogs", (req, res) => {
  res.render("blogs/index", { blogs });
});

//form to create new blog
app.get("/blogs/new", (req, res) => {
  res.render("blogs/new");
});

//create new blog  --> POST
app.post("/blogs", (req, res) => {
  // console.log(`Data Receieved`);
  // console.log(req.body);
  const { title, description, image } = req.body;
  const newBlog = { title, description, image, id: uuidv4() };
  blogs.push(newBlog);
  res.redirect("/blogs");
});

//create new blog  --> GET
// app.get("/blogs-create",(req,res)=>{
//     // console.log(`Data Receieved`);
//     console.log(req.query);
// })

//show deatail of specific blog
app.get("/blogs/:id", (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  const foundBlog = blogs.find((blog) => blog.id === id);
  // console.log(foundBlog);
  res.render("blogs/show", { foundBlog });
});

//form to edit specific blog
app.get("/blogs/:id/edit", (req, res) => {
  const { id } = req.params;
  const foundBlog = blogs.find((blog) => blog.id === id);
  res.render("blogs/edit", { foundBlog });
});

//update spacific blog
app.patch("/blogs/:id", (req, res) => {
  // console.log(`Update API Hit!`);
  const { id } = req.params;
  const { title, description, image } = req.body;

  let index = blogs.findIndex((blog) => blog.id == id);

  if (index !== -1) {
    blogs[index]["title"] = title;
    blogs[index]["description"] = description;
    blogs[index]["image"] = image;
  }

  //Quiz Write the code to update array element by youself
  res.redirect("/blogs", blogs[index]);
});

//delete spacific blog
app.delete("/blogs/:id", (req, res) => {
  // console.log(`Update API Hit!`);
  const { id } = req.params;

  const array1= blog.filter((blog) => blog.id !== id);

  blogs = array1

  //Quiz Write the code todelete the array element by youself
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

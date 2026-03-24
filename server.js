const express = require("express");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const mailRoutes = require("./routes/mailRoutes");
app.use("/", mailRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
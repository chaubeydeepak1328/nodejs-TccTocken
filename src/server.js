// Express Setup: Basic setup for the Express application.
const express = require("express");
const path = require("path");
const hbs = require("hbs")
const app = express();
const colors = require("colors");
const cookieParser = require('cookie-parser');



const port = process.env.PORT || 3000;

// Path Setup: Define paths for static files, views, and partials.
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");


// View Engine and Static Files: Configure Handlebars and set the static files directory.
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);
app.use(express.static(static_path));
app.use(express.static(partial_path)); // Serve partials folder as static

const userRouter = require("./router/user");

// Middleware: Use JSON parsing, cookie parsing, and URL encoding middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// Middleware to parse cookies
app.use(cookieParser());




// Routers: Use the imported routers for handling routes.
app.use(userRouter);


// Start Server: Start the Express server on the defined port.
app.listen(port, () => {
    console.log(colors.cyan(`Listening to the port ${port}`));
})
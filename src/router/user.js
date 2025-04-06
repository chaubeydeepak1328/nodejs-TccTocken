const express = require('express');
const router = express.Router();

// Account Page Route
router.get("/userDashboard", (req, res) => {
    res.render("index");
});

// Account Page Route
router.get("/404", (req, res) => {
    res.render("404");
});
// Account Page Route
router.get("/about", (req, res) => {
    res.render("about");
});
// Account Page Route
router.get("/collection", (req, res) => {
    res.render("collection");
});
// Account Page Route
router.get("/coming-soon", (req, res) => {
    res.render("coming-soon");
});
// Account Page Route
router.get("/contact", (req, res) => {
    res.render("contact");
});

// Account Page Route
router.get("/", (req, res) => {
    res.render("index-2");
});

// Account Page Route
router.get("/login", (req, res) => {
    res.render("login");
});
// Account Page Route
router.get("/privacy-policy", (req, res) => {
    res.render("privacy-policy");
});
// Account Page Route
router.get("/roadmap", (req, res) => {
    res.render("roadmap");
});
// Account Page Route
router.get("/terms-conditions", (req, res) => {
    res.render("terms-conditions");
});


// Account Page Route
router.get("/tocenomics", (req, res) => {
    res.render("tocenomics");
});


// For Direct Earning Page
router.get("/earning", (req, res) => {
    res.render("earning");
});



// for Level Earning Page
router.get("/level-earning", (req, res) => {
    res.render("level-earning");
});

module.exports = router;

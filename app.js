const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "At our blog, we understand the importance of staying up to date with the latest trends and developments. That's why we continuously curate content that reflects the ever-changing landscape of our world. From breaking news to thought-provoking opinion pieces, we aim to provide you with fresh perspectives and valuable insights that can help you navigate through the complexities of modern life.";
const aboutContent = "With a diverse range of backgrounds and expertise, our team brings a unique perspective to the topics we cover. From technology and science to arts and culture, we aim to offer a well-rounded collection of articles that cater to a wide audience. We carefully research each topic and present information in a clear and concise manner, making complex subjects easy to understand.";
const contactContent = "contact me through my email: ashi**************203@gmail.com" + " contact me through my phone number: *******486";

const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function(req, res) {
    res.render("home", { homeQoute: homeStartingContent, postArray: posts });
});

app.get("/about", function(req, res) {
    res.render("about", { aboutQoute: aboutContent });
});
app.get("/contact", function(req, res) {
    res.render("contact", { contactQoute: contactContent });
});
app.get("/compose", function(req, res) {
    res.render("compose");
});

app.get("/posts/:postName", function(req, res) {
    posts.forEach(function(post) {
        if (_.lowerCase(post.title) === _.lowerCase(req.params.postName)) {
            res.render("post", { title: post.title, content: post.content })
        }
    });
});

app.post("/compose", function(req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
});















app.listen(3000, function() {
    console.log("Server started on port 3000");
});

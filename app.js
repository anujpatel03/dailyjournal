const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
const port = process.env.PORT || 3000;
// const serverless = require("serverless-http");
// const router = express.Router();

const contents = [];
const homeStartingContent = "Welcome to Daily Log! Capture your daily moments, thoughts, and experiences in a personal space that is all your own. Embrace self-reflection, express yourself. Start your transformative journaling journey today.";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home", { homeContent: homeStartingContent, newPost: contents });     // ejs home.ejs ko dhundega views folder ke andar fir {key:value}
})

app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/contact", (req, res) => {
    res.render("contact");
})
app.get("/compose", (req, res) => {
    res.render("compose");
})

app.post("/compose", (req, res) => {
    const content = {                     // Making object for new Post
        title: req.body.title,
        post: req.body.post
    }
    contents.push(content);
    res.redirect("/");
})

app.get("/posts/:topic", (req, res) => {
    const lowerRequestedTopic = _.trim(_.lowerCase(req.params.topic));
    contents.forEach((content) => {
        const lowerContentTitle = _.trim(_.lowerCase(content.title));
        if (lowerRequestedTopic === lowerContentTitle) {
            res.render("post", { postTitle: content.title, postContent: content.post });
            // console.log("Match found");
        }

    })
    // console.log(req.params.topic); 
})

// app.use('/.netlify/functions/api', router);  // path must route to lambda
// module.exports.handler = serverless(app);

app.listen(port, function () {
    console.log(`Server is running at port: ${port}`);
});

// app.listen(80, () => {
//     console.log("Server is running at port 80");
// })


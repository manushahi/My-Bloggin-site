//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hey! this is a bloggong website.";
const aboutContent = "This is a blogging website designed with the help of express and node. The website is designed by Manu Shahi during my training. Hope you will use this site to post your blogs.";
const contactContent = " At any given time if you feel like reaching me out, you can drop a mail to : demomail@xyz.com . You can also ping me on this number:0123456789";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
    // if(posts.length!=0){console.log(posts);};
    //
});

app.get("/about", function(req, res){
  res.render("about", {aboutabout: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {aboutContact: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  // console.log(req.body.postBody);
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  for(var i=0; i<posts.length;i++){
    const storedTitle=_.lowerCase(posts[i].title);
    if(storedTitle=== requestedTitle){
      res.render("post",{
        title:posts[i].title,
        content:posts[i].content
      });

    }
    // this else statement can be used in case somenew or unmatched request is made . this can also be used to show that unrreachebale page kind of things .
  // we can print err or unreachable through this else statement

    // else{
    //   // console.log("new topic");
    //   res.render("error");
    // }
  }

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
